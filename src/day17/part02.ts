import { readFileSync } from 'fs';
const fileName = process.argv[2]

const obj: {[key: string] : number} = {}
const input = readFileSync(fileName, 'utf-8').split(': ')[1].split(', ').map(el => {
    const comp = el.split('=')
    const [x1, x2] = comp[1].split('..').map(num => parseInt(num));
    obj[`${comp[0]}1`] = x1 > x2 ? x2 : x1
    obj[`${comp[0]}2`] = x1 > x2 ? x1 : x2

});
// you can bound the number of possibilities to check from lowest y and highest y
// and lowest x and highest x

let xPos = []
let yPos = [obj['y1'], 153]
let n = 1
while (n*(n+1)/2 < obj['x1']){
    n++
}
xPos.push(n)
xPos.push(obj['x2'])
console.log(xPos, yPos);
let numPos = 0
for (let x = xPos[0]; x <= xPos[1]; x++){
    for (let y = yPos[0]; y <= yPos[1]; y++){
        let yPos = 0
        let xPos = 0
        let yVel = y
        let xVel = x
        while (yPos >= obj['y1'] && xPos <= obj['x2']){
            yPos += yVel
            xPos += xVel
            if (yPos >= obj['y1'] && yPos <= obj['y2'] && xPos >= obj['x1'] && xPos <= obj['x2'] ){ // in target area
                numPos++
                break;
            }
            if (xVel > 0){
                xVel--
            }
            yVel--
        }       
    }
}
console.log(numPos)
// let slowestX = n 

// let cnt = true
// let initY = 0
// let maxY = 0
// let numY = 0
// while (cnt || initY < 1000){
//     cnt = false
//     let yPos = 0
//     let yVel = initY
//     let currMax = 0
//     while (yPos >= obj['y1'] || yPos >= obj['y2']){
//         yPos += yVel
//         currMax = Math.max(yPos, currMax)
//         if (yPos >= obj['y1'] && yPos <= obj['y2'] ){ // in target area
//             cnt = true
//             console.log(maxY, currMax);
//             maxY = Math.max(currMax, maxY)
//             numY++
//             break;
//         }

//         yVel--
//     }

//     initY++
// }
// console.log(obj)
// console.log(slowestX, maxY)