import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf-8').split('\n');

let n = input.length;
let commonBits = '001011110001'.length;
let commonBitArray: number[] = new Array(commonBits).fill(0);
for (let i = 0; i < input.length; i ++){
    let line = input[i].split('')
    for (let j = 0; j < line.length; j++){
        commonBitArray[j] += line[j] === '1' ? 1 : 0
    }
}
let gam = ''
let eps = ''
for (let num of commonBitArray){
    if (num > n/2){
        gam += '1'
        eps += '0'
    } else {
        gam += '0'
        eps += '1'
    }
}

console.log(gam, eps)

console.log(parseInt(gam, 2) * parseInt(eps, 2));