import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input = readFileSync(fileName, 'utf-8').split('\n').map(elem => elem.split('').map(el => parseInt(el)));
const modifiedInput = []
for (let i =0; i < input.length; i++){
    let copiedLine = [...input[i]]
    let newLine = [...input[i]]
    for (let j = 0; j < 4; j++){
        copiedLine = [...copiedLine].map(elem => elem + 1 > 9 ? 1 : elem + 1 )
        newLine = newLine.concat(copiedLine)
    }
    modifiedInput[i] = newLine
}
let finalInput: number[][] = []
for (let z = 0; z < 5; z++){
    for (let k = 0; k < modifiedInput.length; k++){
        let copiedLine = [...modifiedInput[k]].map(elem => elem + z > 9 ? elem + z - 9 : elem + z)
        finalInput.push(copiedLine)
    }
}
let n = finalInput.length
let m = finalInput[0].length;
const leastArray: number[][] = Array.from(Array(n), ()=> Array(m).fill(0));


// for (const line of finalInput){
//     console.log(line.join(''))
// }


// for (let k = 0; k < 4; k++){
//     for (let )
    
// }





let queue: number[][] = [[0, 1, 0], [1, 0, 0]]
let arrayDir = [[0, 1], [1, 0], [0, -1], [-1, 0]]

while (queue.length > 0){
    const [x, y, currentRisk] = queue.pop() || [0,0,0]
    // console.log(x, y, currentRisk)


    if (finalInput[y] && finalInput[y][x]){
        let accRisk = currentRisk + finalInput[y][x]
        // 2918 is an arbitrary number taken from the code below... should fix this?
        if (leastArray[y][x] === 0 || (accRisk < leastArray[y][x] && accRisk < 2918)){
            // console.log(accRisk, leastArray[y][x], leastArray[y].join(''))
            leastArray[y][x] = accRisk
            for (const dir of arrayDir){
                let dx = x + dir[0]
                let dy = y + dir[1]
                if (leastArray[dy] && finalInput[dy][dx])
                    queue.push([dx, dy, accRisk])
            }
        }

    }
}

// let current = 0
// for (let i = 1; i < m; i++){
//     current += finalInput[0][i]
//     leastArray[0][i] = current
// }
// current = 0
// for (let j = 1; j < n; j++){
//     current += finalInput[j][0]
//     leastArray[j][0] = current
// }
// leastArray[0][0] = 0

// for (let y = 1; y < n; y++){
//     for (let x = 1; x < m; x++){
//         leastArray[y][x] = Math.min(leastArray[y-1][x], leastArray[y][x-1]) + finalInput[y][x]
//     }
// }

// // it's possible to move up and left in this as well
// // theoretically you can move up/eft for a better path
// // maybe it's better to do a BFS from both options?
// for (const line of leastArray){
//     console.log(line.join(''))
// }
console.log(leastArray[n-1][m-1])