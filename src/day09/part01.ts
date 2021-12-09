import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input = readFileSync(fileName, 'utf-8').split('\n').map(elem=>elem.split('').map(elem => parseInt(elem)));

let risk = 0 
for (let i = 0; i < input.length; i++){
    for (let j = 0; j < input[i].length; j++){
        let curr = input[i][j]
        let lowPoint = true
        if (i > 0){
            lowPoint &&= curr < input[i-1][j]
        }
        if (i < input.length -1){
            lowPoint &&= curr < input[i+1][j]

        }
        if (j > 0){
            lowPoint &&= curr < input[i][j-1]            

        }
        if (j < input[i].length -1){
            lowPoint &&= curr < input[i][j+1]
        }
        if (lowPoint){
            risk += 1+ curr
        }
    }
}

console.log(risk)
