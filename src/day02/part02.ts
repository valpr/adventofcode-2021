import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf-8').split('\n');

let horizontal = 0
let depth = 0
let aim = 0
for (let i = 0; i < input.length; i ++){
    let [direction, mag] = input[i].split(' ');
    let magN = parseInt(mag)
    if (direction === 'down'){
        aim += magN
    } else if (direction === 'up'){
        aim -= magN
    } else {
        horizontal += magN
        depth += aim * magN
    }
}
console.log(depth)
console.log(horizontal)

console.log(horizontal * depth);