import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf-8').split('\n');

let horizontal = 0
let depth = 0
for (let i = 0; i < input.length; i ++){
    let [direction, mag] = input[i].split(' ');
    console.log(direction, mag)
    let magN = parseInt(mag)
    if (direction === 'down'){
        depth += magN
    } else if (direction === 'up'){
        depth -= magN
    } else {
        horizontal += magN
    }
}
console.log(depth)
console.log(horizontal)

console.log(horizontal * depth);