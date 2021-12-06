import { readFileSync } from 'fs';

let fishArray = readFileSync('./input.txt', 'utf-8').split(',').map(num => parseInt(num));


const days = 256
const fishCounts = [0,0,0,0,0,0,0,0,0]
for (const fish of fishArray){
    fishCounts[fish] += 1
}

for (let i = 0; i < days; i++){
    if (fishCounts.length > 1){
        let fishReset: number = fishCounts.shift() || 0
        fishCounts[6] += fishReset
        fishCounts.push(fishReset)
    }
}

console.log(fishCounts.reduce((previousVal, currentVal)=> previousVal+ currentVal))
