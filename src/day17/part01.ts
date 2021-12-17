import { readFileSync } from 'fs';
const fileName = process.argv[2]

const obj: {[key: string] : number} = {}
const input = readFileSync(fileName, 'utf-8').split(': ')[1].split(', ').map(el => {
    const comp = el.split('=')
    const [x1, x2] = comp[1].split('..').map(num => parseInt(num));
    obj[`${comp[0]}1`] = x1 > x2 ? x2 : x1
    obj[`${comp[0]}2`] = x1 > x2 ? x1 : x2

});
// find the greatest y velocity that causes it to be in the target area
// therefore, must shoot the slowest x possible

let n = 1
while (n*(n+1)/2 < obj['x1']){
    n++
}

let slowestX = n 

let cnt = true
let initY = 0
let maxY = 0
while (cnt || initY < 500){
    cnt = false
    let yPos = 0
    let yVel = initY
    let currMax = 0
    while (yPos >= obj['y1'] || yPos >= obj['y2']){
        yPos += yVel
        currMax = Math.max(yPos, currMax)
        if (yPos >= obj['y1'] && yPos <= obj['y2'] ){ // in target area
            cnt = true
            console.log(maxY, currMax, initY);
            maxY = Math.max(currMax, maxY)
            break;
        }

        yVel--
    }

    initY++
}
// console.log(obj)
console.log(slowestX, maxY)