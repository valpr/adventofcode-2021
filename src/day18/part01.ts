import { readFileSync } from 'fs';
import { inspect } from 'util';
const fileName = process.argv[2]
type SnailNum = number[] | SnailNum[]
let input: string[] = readFileSync(fileName, 'utf-8').split('\n');
let qckInput: SnailNum[] = []
input.forEach((val, idx) => { // hack
    eval(`qckInput[${idx}]=${val}`)
})

const addToLeftmost = (number:SnailNum, toAdd: number) => {
    if (typeof number[0] === 'number')
        number[0] += toAdd
    else addToLeftmost(number[0], toAdd)
}

const addToRightmost = (number: SnailNum, toAdd: number) =>{
    if (typeof number[1] === 'number')
        number[1] += toAdd
    else addToRightmost(number[1], toAdd)
}

const tryExplode = (number: SnailNum, nesting: number): [number, boolean, number] => {
    let exploded = false
    let addLeft = 0, addRight = 0
    if (nesting === 4){
        if (typeof number[0] != 'number' && typeof number[0][1] === 'number' && typeof number[0][0] === 'number'){
            // explode right
            const temp = number[0][1]
            if (typeof number[1] === 'number'){
                number[1] += temp
            } else {
                addToLeftmost(number[1], temp)
            }
            addLeft = number[0][0]
            number[0] = 0
            exploded = true
        } else if (typeof number[1] != 'number' && typeof number[1][1] === 'number' && typeof number[1][0] === 'number') {
            // explode left
            const temp = number[1][0]
            if (typeof number[0] === 'number'){
                number[0] += temp
            } else {
                addToRightmost(number[0], temp)
            }
            addRight = number[1][1]
            number[1] = 0
            exploded = true
        }
    } else {
        if (typeof number[0] != 'number'){
            [addLeft, exploded, addRight] = tryExplode(number[0], nesting + 1)
            if (exploded && addRight) {
                if (typeof number[1] === 'number'){
                    number[1] += addRight
                } else {
                    addToLeftmost(number[1], addRight)
                }
                addRight = 0

            }
        } 
        if (!exploded && typeof number[1] != 'number') {
            [addLeft, exploded, addRight] = tryExplode(number[1], nesting + 1)
            if (exploded && addLeft) {
                if (typeof number[0] === 'number'){
                    number[0] += addLeft
                } else {
                    addToRightmost(number[0], addLeft)
                }
                addLeft = 0
            }
        }
    }
    return [addLeft, exploded, addRight]
}

const trySplit = (number: SnailNum): boolean => {
    let split = false
    if (typeof number[0] === 'number' && number[0] >= 10){
        number[0] = [Math.floor(number[0]/2), Math.ceil(number[0]/2)]
        split = true
    }
    if (!split && typeof number[0] != 'number'){
        split = trySplit(number[0])
    }
    if (!split && typeof number[1] === 'number' && number[1] >= 10){
        number[1] = [Math.floor(number[1]/2), Math.ceil(number[1]/2)]
        split = true
    }
    if (!split && typeof number[1] != 'number') {
        split = trySplit(number[1])
    }

        return split
}


const reduce = (number: SnailNum): SnailNum => {

    let exploded = false
    let split = true // just to start first
    // console.log(inspect(number, false, null, true /* enable colors */))

    while (exploded || split){
        split = false
        let _left, _right
        [_left, exploded, _right] = tryExplode(number, 1)
        if (!exploded){
            split = trySplit(number)
        }
        // console.log('Exploded:', exploded); 
        // console.log('Split:', split); 

        // console.log(inspect(number, false, null, true /* enable colors */))

    }
    // console.log(inspect(number, false, null, true /* enable colors */))
    return number
}

let current = qckInput[0]

for (const line of qckInput.slice(1)){
    current = reduce([current, line])
}

const calculateMagnitude =(curr: SnailNum | number): number => {
    //magnitude formula (after all numbers added):
    // (3* left) + (2* right)
    if (typeof curr === 'number'){
        return curr
    } else {
        return 3 * calculateMagnitude(curr[0]) + 2 * calculateMagnitude(curr[1])
    }
}
console.log('final')
// console.log(inspect(current, false, null, true))
console.log(calculateMagnitude(current));
