import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input = readFileSync(fileName, 'utf-8').split('\n');

console.log(input)

const days = 256
const fishCounts = [0,0,0,0,0,0,0,0,0]

for (const x of input){

}

for (let i = 0; i < days; i++){

}

console.log(fishCounts.reduce((previousVal, currentVal)=> previousVal+ currentVal))
