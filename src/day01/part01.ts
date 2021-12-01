import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf-8').split('\n').map(num => parseInt(num));

let increases = 0
for (let i = 1; i < input.length; i ++){
    if (input[i] > input[i-1]){
        increases++
    }
}

console.log(increases);