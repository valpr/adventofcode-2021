import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf-8').split('\n');
const n = 1000
const lineArray = Array.from(Array(n), _ => Array(n).fill(0))
let overlap = 0
for (const line of input){
    const [c1, c2] = line.split(' -> ').map(num => num.split(',').map(nu => parseInt(nu)));
    if (c1[0] === c2[0]){
        let sameRow = c1[0]
        let smaller = c1[1] > c2[1] ? c2[1] : c1[1]
        let larger = c1[1] > c2[1] ? c1[1] : c2[1]

        for (let i = smaller; i <= larger; i++){
            lineArray[i][sameRow] += 1
            if (lineArray[i][sameRow] === 2){
                overlap++;
            }
        }
    } else if (c1[1] === c2[1]){
        let sameCol = c1[1]
        let smaller = c1[0] > c2[0] ? c2[0] : c1[0]
        let larger = c1[0] > c2[0] ? c1[0] : c2[0]

        for (let i = smaller; i <= larger; i++){
            lineArray[sameCol][i] += 1
            if (lineArray[sameCol][i] === 2){
                overlap++;
            }
        }
    } else {
        let smaller = c1[1] > c2[1] ? c2 : c1
        let larger = c1[1] > c2[1] ? c1 : c2

        let row = smaller[0]
        let increment = smaller[0] < larger[0] ? 1 : -1

        for (let i = smaller[1]; i <= larger[1]; i++){
            lineArray[i][row] += 1
            if (lineArray[i][row] === 2){
                overlap++;
            }
            row += increment
        }

    }
}
console.log(lineArray);

console.log(overlap)