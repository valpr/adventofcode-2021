import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input = readFileSync(fileName, 'utf-8').split('\n').map(elem => elem.split('').map(el => parseInt(el)));


const leastArray = Array.from(Array(input.length), ()=> Array(input[0].length).fill(0));

let n = input.length
let m = input[0].length;

// let queue: number[][] = [[0, 1, 0], [1, 0, 0]]
// let arrayDir = [[0, 1], [1, 0], [0, -1], [-1, 0]]

// while (queue.length > 0){
//     const [x, y, currentRisk] = queue.pop() || [0,0,0]
//     // console.log(x, y, currentRisk)


//     if (input[y] && input[y][x]){
//         let accRisk = currentRisk + input[y][x]

//         if (leastArray[y][x] === 0 || (accRisk < leastArray[y][x] && accRisk < 700)){
//             // console.log(accRisk, leastArray[y][x], leastArray[y].join(''))
//             leastArray[y][x] = accRisk
//             for (const dir of arrayDir){
//                 let dx = x + dir[0]
//                 let dy = y + dir[1]
//                 if (leastArray[dy] && input[dy][dx])
//                     queue.push([dx, dy, accRisk])
//             }
//         }

//     }
// }
// const expand = (y: number, x: number, currentRisk: number) => {
//     let arrayDir = [[0, 1], [1, 0], [0, -1], [-1, 0]]



//     if (input[y] && input[y][x]){
//         let accRisk = currentRisk + input[y][x]
//         if (leastArray[y][x] === 0 || accRisk < leastArray[y][x]){
//             leastArray[y][x] = accRisk
//             for (const dir of arrayDir){
//                 let dx = x + dir[0]
//                 let dy = y + dir[1]
//                 expand(dy, dx, accRisk)
//             }
//         }

//     }

// }

// expand(1, 0, 0)
// expand(0, 1, 0)

let current = 0
for (let i = 1; i < m; i++){
    current += input[0][i]
    leastArray[0][i] = current
}
current = 0
for (let j = 1; j < n; j++){
    current += input[j][0]
    leastArray[j][0] = current
}
leastArray[0][0] = 0

for (let y = 1; y < n; y++){
    for (let x = 1; x < m; x++){
        leastArray[y][x] = Math.min(leastArray[y-1][x], leastArray[y][x-1]) + input[y][x]
    }
}

// it's possible to move up and left in this as well
// theoretically you can move up/eft for a better path
// maybe it's better to do a BFS from both options?
for (const line of leastArray){
    console.log(line.join('').substring(0,5))
}
console.log(leastArray[n-1][m-1])