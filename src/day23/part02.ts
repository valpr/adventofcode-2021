import { count } from "console"

const costKey: {[key: string]: number} = { 'A': 1, 'B': 10, 'C': 100, 'D': 1000 }
const numLetterKey = ['A', 'B', 'C', 'D']
// const roomCapacity = 4
const roomCapacity = 4
let smallestEnergyCost = Infinity
type apod = string
type gameState = {
    energy: number,
    stateKey: string
    history: any[]
}
let roomIndexes: {[key: string]: number} = {
    'A': 2,
    'B': 4,
    'C': 6,
    'D': 8
}

const energyToSlot = (
    type: apod, 
    roomType: apod, 
    roomSlot: number,  
    slotIndex: number) => {
    // returns energy cost of going to slot or way back
    const intoHallway = (roomCapacity-roomSlot) * costKey[type] // hallway infront of door cost
    const currentIndex = roomIndexes[roomType]
    const moveToSlot = Math.abs(slotIndex-currentIndex) * costKey[type]
    return moveToSlot + intoHallway
};

const pathClear = (slot: number, currentSlot: number, hallway: string[]): boolean => {
    if (currentSlot < slot){
        for (let i = currentSlot; i < slot; i++){
            if (hallway[i] != '.' && hallway[i] != 'x'){
                return false
            }
        }
    } else {
        for (let i = currentSlot; i > slot; i--){
            if (hallway[i] != '.' && hallway[i] != 'x'){
                return false
            }
        }
    }
    return true
} 

const availableMoves = (rooms: apod[][], hallway: string[] , energy: number, currentHistory: any[]) => {
    let available: number[] = []
    let moveArray: gameState[] = []
    // need to do moves from hallway to rooms
    for (const [slotIndex,elem] of hallway.entries()){
        if (numLetterKey.find(entry => entry === elem)){ // check if ABCD
            // search for viable room
            let rightIndex = numLetterKey.findIndex(num => num === elem)
            let viableRoom = rooms[rightIndex]
            if (viableRoom.length < roomCapacity){ // don't check if full and check if right element
                if (viableRoom.filter(el => 
                    el === numLetterKey[rightIndex]).length === viableRoom.length &&
                    pathClear(slotIndex, roomIndexes[numLetterKey[rightIndex]], hallway)
                ){ // check if all elements are the right one
                    
                    let newHallway = [...hallway]
                    let newRooms = []
                    for (let [oldIdx, oldRoom] of rooms.entries()){
                        if (oldIdx === rightIndex){
                            newRooms.push([...viableRoom, elem])
                        } else {
                            newRooms.push([...oldRoom])
                        }
                    }

                    newHallway[slotIndex] = '.'
                    let newEnergy = energy + energyToSlot( // do it in reverse
                        elem,
                        numLetterKey[rightIndex],
                        viableRoom.length, // no - 1 because we are using next avail space
                        slotIndex
                    )
                    let newStateKey = createStateKey(newHallway,newRooms)

                    moveArray.push({
                        energy: newEnergy,
                        stateKey: newStateKey,
                        history: [...currentHistory, 
                            `slot ${slotIndex}:elem ${elem}  to room ${numLetterKey[rightIndex]}, energy: ${newEnergy}`]
                    })
                }
            }
        }
    }
    if (moveArray.length === 0){
        for (const [roomType,room] of rooms.entries()){
            // Check to make sure that they aren't already in the right place
            if (room.filter(el => 
                el === numLetterKey[roomType]).length === room.length
            ) continue;
            available = []
            for (let i = roomIndexes[numLetterKey[roomType]]; i >= 0; i --){
                if (hallway[i] === '.'){
                    if (pathClear(i, roomIndexes[numLetterKey[roomType]], hallway)){
                        available.push(i)
                    } else {
                        break;
                    }
                }
            }
            for (let i = roomIndexes[numLetterKey[roomType]]; i < hallway.length; i++){
                if (hallway[i] === '.'){
                    if (pathClear(i, roomIndexes[numLetterKey[roomType]], hallway)){
                        available.push(i)
                    } else {
                        break;
                    }
                }
            }
            const costArray = available.map(el => {
                let letter = room[room.length -1]
                let newHallway = [...hallway]
                newHallway[el] = letter
                let newRoom = [...rooms[roomType]]
                newRoom.pop()
                let newRooms = []
                for (let [oldIdx, oldRoom] of rooms.entries()){
                    if (oldIdx === roomType){
                        newRooms.push([...newRoom])
                    } else {
                        newRooms.push([...oldRoom])
                    }
                }
                let newEnergy = energy + energyToSlot(letter,
                    numLetterKey[roomType],
                    room.length-1, 
                    el
                )
                let newStateKey = createStateKey(newHallway,newRooms)
                return {
                    energy: newEnergy,
                    stateKey: newStateKey, // use new State key instead
                    history: [...currentHistory, 
                        `room ${numLetterKey[roomType]}:elem ${letter}  to slot ${el}, energy: ${newEnergy}`]
                }
        
            })
            moveArray = [...moveArray, ...costArray]
        }
    }


    return moveArray
}

const createStateKey = (hallway: string[], rooms: apod[][]) => {
    return `${hallway.join('')}|${rooms[0].join('')}|${rooms[1].join('')}|${rooms[2].join('')}|${rooms[3].join('')}`
}
const readStateKey = (statekey: string) => {
    return statekey.split('|').map(el => el.split('')) 
}

const checkWin = (rooms: apod[][]) => {
    for (let i =0 ; i < rooms.length; i++){
        for (let j = 0; j < rooms[i].length; j++){
            if (rooms[i][j] != numLetterKey[i]){
                return false
            }
        }
        if (rooms[i].length != roomCapacity){
            return false
        }
    }
    return true
}

let initialHallway = Array(11).fill('.')
initialHallway[2] = 'x'
initialHallway[4] = 'x'
initialHallway[6] = 'x'
initialHallway[8] = 'x'
let initialRooms: apod[][] = [ // index 0 is the room A
    ['B','D', 'D', 'C'], // the first index is the deepest one, functions like stack
    ['C','B','C','B'],
    ['D','A','B','A'],
    ['A','C','A','D']
]

let practice: apod[][] = [ // index 0 is the room A
    ['A','D', 'D','B'], // the first index is the deepest one, functions like stack
    ['D','B','C','C'],
    ['C','A','B','B'],
    ['A','C','A','D']
]
// let initialRooms: apod[][] = [ // index 0 is the room A
//     ['D','B','B','C'], // the first index is the deepest one, functions like stack
//     ['C','B','C','B'],
//     ['D','A','B','A'],
//     ['A','C','A','D']
// ]
let stateObject: {[key: string]: boolean} = {}
// keep track of whether this state has been tried before
const queue: gameState[] = []
const solve = (stateKey: string) => {
    // first check if already done
    queue.push({
        energy: 0,
        stateKey,
        history: []
    })
    while (queue.length > 0){
        const currentStateKey = queue[queue.length-1].stateKey
        const currentEnergy = queue[queue.length-1].energy
        const currentHistory = queue[queue.length-1].history
        const [hallway, roomA, roomB, roomC, roomD] = readStateKey(currentStateKey)
        queue.pop()

        if (!stateObject[currentStateKey]){
            if (checkWin([roomA, roomB, roomC, roomD])){
                smallestEnergyCost = Math.min(smallestEnergyCost, currentEnergy)
                console.log(currentHistory)
                break;
            } else {
                stateObject[currentStateKey] = true
                queue.push(...availableMoves([roomA, roomB, roomC, roomD], hallway, currentEnergy, currentHistory))
                queue.sort((a,b)=> b.energy-a.energy) // mock heap
            }
        }
    }


}
const initialStateKey = createStateKey(initialHallway,initialRooms)
solve(initialStateKey)
console.log('practice answer: 44169')
console.log(smallestEnergyCost)