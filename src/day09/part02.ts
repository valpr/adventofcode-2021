import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input:number [][] = readFileSync(fileName, 'utf-8').split('\n').map(elem=>elem.split('').map(elem => parseInt(elem) === 9 ? 0 : 1));

// number of islands where islands are divided by 9s
const largestIslands = [1, 1, 1]
let currentBasin = 0
const expand = (x: number, y: number) => {
    // marks x and y as part of a basin (-1)
    // checks if adjacent are 1s
    input[x][y] = -1 
    currentBasin += 1
    const dirArray = [[-1, 0], [1, 0], [0, -1], [0, 1]]
    for (const dir of dirArray){
        let xDir =x+dir[0]
        let yDir =y+dir[1]
        if (input[xDir] && input[xDir][yDir] === 1){
            expand(xDir, yDir)
        }
    }


}


for (let i = 0; i < input.length; i++){
    for (let j = 0; j < input[i].length; j++){
        if (input[i][j] === 1){
            expand(i, j)
            // simulate min heap
            largestIslands.push(currentBasin)
            largestIslands.sort((a,b) => b-a)
            largestIslands.pop()

            currentBasin = 0
        }
    }
}

console.log(largestIslands)
console.log(largestIslands[0] * largestIslands[1] * largestIslands[2])
