import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input = readFileSync(fileName, 'utf-8').split(',').map(elem=>parseInt(elem));

// find the mean now, to minimize the farthest movement
// Then amount of fuel spent is difference between position and 
input.sort((a,b)=> a-b);
const sum = input.reduce((acc, current) => acc+current)
const n = input.length;
const position = Math.floor(sum/n)
const position2 = Math.round(sum/n)

const fuelSpent = input.reduce((acc, current) => {
    let diff = Math.abs(position-current)
    //sum of numbers = n(n+1)/2
    return acc + (diff * (diff + 1) / 2)
},0)

const fuelSpent2 = input.reduce((acc, current) => {
    let diff = Math.abs(position2-current)
    //sum of numbers = n(n+1)/2
    return acc + (diff * (diff + 1) / 2)
},0)

console.log('Positions: ',position, position2)
console.log('Fuel Spent: ', fuelSpent > fuelSpent2 ? fuelSpent2 : fuelSpent)