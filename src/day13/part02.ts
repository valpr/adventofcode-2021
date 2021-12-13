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
            paper[y][x] = 1
        } else {
            let x = dot[0]
            let y = dot[1]
            paper[y][x] = 1
        }
    }
}
if (fold[0] === 'y'){
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

for (const foldSub of folds.slice(1)){
    let newPaper: number [][] = Array.from(Array(n), () => Array(n).fill(0))
    foldLine = parseInt(foldSub[1])
    for (let r = 0; r < paper.length; r++){
        for (let c = 0; c < paper[0].length; c++){

            if (foldSub[0] === 'x'){
                if (paper[r][c] && c > foldLine){
                    let x = foldLine - (c - foldLine)
                    let y = r
                    newPaper[y][x] = 1
                } else if (paper[r][c]) {
                    newPaper[r][c] = 1
                }
            }
            else if (foldSub[0] === 'y'){
                if (paper[r][c] && r > foldLine){
                    let x = c
                    let y = foldLine - (r - foldLine)
                    newPaper[y][x] = 1
            
                } else if (paper[r][c]) {
                    newPaper[r][c] = 1
                }
            }


        }
    }
    paper = newPaper
}

console.log('--')
for (const line of paper.slice(0,50)){
    console.log(line.join('').substring(0,50))
}