import { readFileSync } from 'fs';
const fileName = process.argv[2]
const [grid, directions] = readFileSync(fileName, 'utf-8').split('\n\n');
const folds = directions.split('\n').map(elem => elem.split(' ')[2].split('='));
const dots = grid.split('\n').map(elem => elem.split(',').map(el => parseInt(el)))

let n = 1100
let paper: number [][] = Array.from(Array(n), () => Array(n).fill(0))
let fold = folds[0]
let foldLine = parseInt(fold[1])
if (fold[0] === 'x'){
    for (const dot of dots){
        if (dot[0] > foldLine){
            let x = foldLine - (dot[0] - foldLine)
            let y = dot[1]
            console.log(y, x)
            paper[y][x] = 1
        } else {
            let x = dot[0]
            let y = dot[1]
            paper[y][x] = 1
            console.log(y, x)
        }
    }
}
if (fold[0] === 'y'){
    console.log(foldLine)
    for (const dot of dots){
        if (dot[1] > foldLine){
            let x = dot[0]
            let y = foldLine - (dot[1] - foldLine)
            paper[y][x] = 1

        } else {
            let x = dot[0]
            let y = dot[1]
            paper[y][x] = 1
        }
    }
}


console.log(paper.reduce((acc, currValue) => acc + currValue.filter(elem => elem === 1).length, 0))