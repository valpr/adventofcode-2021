import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input:number [][] = readFileSync(fileName, 'utf-8').split('\n').map(elem=>elem.split('').map((val) => parseInt(val)));

let totalFlashes = 0
let flashed: boolean [][];
const numSteps = 100
const flash = (x: number, y: number) => {
    if (flashed[x] && flashed[x][y] === false){ // if already flashed, ignore
        if (input[x][y] >= 9){ //flash
            const dirArray = [[-1, 1], [-1, 0],[-1, -1],[0, 1],[0, -1],[1, 1],[1, 0],[1, -1]]
            totalFlashes+= 1
            flashed[x][y] = true
            input[x][y] = 0
            for (const dir of dirArray){
                let dx = x + dir[0]
                let dy = y + dir[1]
                flash(dx, dy)                
            }
        } else {
            input[x][y] += 1
        }
    }

}

for (let steps = 0; steps < numSteps; steps++){
    const flashQ:number [][] = []
    flashed = Array.from(Array(input.length), () => Array(input[0].length).fill(false))
    for (let i = 0; i < input.length; i++){
        for (let j = 0; j < input[i].length; j++){
            // First, increment all by 1
            // Then, if there is an octopus with 10 energy, add it to a queue to flash
            input[i][j] += 1
            if (input[i][j] > 9){
                flashQ.push([i, j])
            }
    
        }
    }
    for (const octo of flashQ){
        flash(octo[0], octo[1])
    }
}

console.log(totalFlashes)