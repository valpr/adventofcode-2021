import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input = readFileSync(fileName, 'utf-8').split(',').map(elem=>parseInt(elem));

// find the median?
// Then amount of fuel spent is difference between position and 
input.sort((a,b)=> a-b);

const position = input[Math.floor(input.length/2)]

const fuelSpent = input.reduce((acc, current) => {
    // console.log(acc+ Math.abs(position-current))
    return acc+ Math.abs(position-current)
},0)

console.log('Position: ',position)
console.log('Fuel Spent: ', fuelSpent)
