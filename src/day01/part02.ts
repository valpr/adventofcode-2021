import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf-8').split('\n').map(num => parseInt(num));

let increases = 0
let window = input[0] + input[1] + input[2];
for (let i = 3; i < input.length; i ++){
    let newWindow = window - input[i-3] + input[i]

    if (newWindow > window){
        increases++
    }
    window = newWindow
}

console.log(increases);