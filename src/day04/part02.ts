import { readFileSync } from 'fs';

const input = readFileSync('./input.txt', 'utf-8').split('\n\n');
let [numbers, ...boards] = input
const gameNumbers = numbers.split(',').map((num) => parseInt(num));
const gameState = boards.map((board) => {
    const n = 5; //assuming square boards
    const regex = /\s+/;
    return {
        numbers: board.split('\n').map((line) => line.split(regex).map((num)=>parseInt(num)).filter((elem) => !isNaN(elem))),
        mark: Array.from(Array(n), _ => Array(n).fill(false)),
        won: false
    }
})
// console.log(gameState[0])
// console.log(gameState[1])
// console.log(gameState[2])

const insertIntoBoard = (board : {numbers: number[][], mark: any[][]}, target: number) => {
    // if in board, mark the index and return
    // if not in board return -1
    for (const [lineIndex, element] of board.numbers.entries()){
        for (const [colIndex, number] of element.entries()){
            if (number === target){
                board.mark[lineIndex][colIndex] = true
                return [lineIndex, colIndex]
            }
        }
    }
    return -1
}
for (const num of gameNumbers){

    for (const board of gameState){
        // console.log(num)
        // console.log(board)
        if (board.won) continue;
        // console.log('continue')
        // check if num in board
        const index = insertIntoBoard(board, num)
        // insert num then check victory of that index
        if (index != -1){
            const [line, col] = index
            let winCol = true
            let winRow = true
            for (let i = 0; i < board.numbers.length; i++){
                winCol &&= board.mark[i][col]
                winRow &&= board.mark[line][i]
            }
            if (winRow || winCol){
                // count unmarked board
                let sum = 0
                for (let i = 0; i < board.numbers.length; i++){
                    for (let j = 0; j < board.numbers[i].length; j++){
                        if (board.mark[i][j] === false){
                            sum += board.numbers[i][j]
                        }
                    }
                }
                console.log(sum * board.numbers[line][col])
                board.won = true;
            }
        }
    }
}
/*
go through numbers one at a time and check boards?
I could just use a boolean array to represent each board - simple way

find the board that wins first
Check for victory on each board after marking a number (diagonal, vertical, horizontal)


sum of all unmarked numbers multiplied by the last number called
just loop through board

*/