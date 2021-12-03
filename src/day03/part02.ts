import { readFileSync } from 'fs';

let input = readFileSync('./input.txt', 'utf-8').split('\n');
let input2 = readFileSync('./input.txt', 'utf-8').split('\n');

let currentBit = 0
while (input.length > 1){
    let newInput = []
    let newInput2 = []
    for (let i = 0; i < input.length; i ++){
        let line = input[i].split('')
        if (line[currentBit] === '1'){
            newInput.push(line.join(''))
        } else {
            newInput2.push(line.join(''))
        }
    }
    if (newInput.length < newInput2.length){
        input = newInput
    } else {
        input = newInput2
    }
    currentBit++
}

currentBit = 0
while (input2.length > 1){
    let newInput = []
    let newInput2 = []
    for (let i = 0; i < input2.length; i ++){
        let line = input2[i].split('')
        if (line[currentBit] === '1'){
            newInput.push(line.join(''))
        } else {
            newInput2.push(line.join(''))
        }
    }
    if (newInput.length >= newInput2.length){
        input2 = newInput
    } else {
        input2 = newInput2
    }
    currentBit++
}

console.log(parseInt(input[0], 2) * parseInt(input2[0], 2));