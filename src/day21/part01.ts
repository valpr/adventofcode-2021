import { readFileSync } from 'fs';
const fileName = process.argv[2]
let [p1, p2]: number[] = readFileSync(fileName, 'utf-8').split('\n').map(elem => parseInt(elem.split(': ')[1]));
let dieRolls = 0
let p1Score = 0
let p2Score = 0
let winCon = 1000
let currentDie = 1
let diceLimit = 100
let pTurn = true // true is player 1, false is player two
let pCounter = 0

const checkWin = () => p1Score >= winCon || p2Score >= winCon

const rollDie = () => currentDie++

const rollForPlayer = (playerSpace: number): number => { //returns new space landed on
    console.log('die roll: ')
    let currNum = 0
    for (let i = 0; i < 3; i ++){
        if (currentDie > diceLimit){
            currentDie = 1
        }
        console.log('rolled: ', currentDie)
        currNum += rollDie()
    }
    console.log('lands on ', (playerSpace+ currNum) % 10 === 0 ? 10 : (playerSpace+ currNum) % 10)
    return (playerSpace+ currNum) % 10 === 0 ? 10 : (playerSpace+ currNum) % 10
}

while (!checkWin()){
    if (pTurn){ //p1
        console.log('player 1 rolls')
        p1 = rollForPlayer(p1)
        p1Score += p1
    } else { //p2
        console.log('player 2 rolls')
        p2 = rollForPlayer(p2)
        p2Score += p2
    }
    dieRolls+= 3
    pTurn = !pTurn
}

console.log(dieRolls)
console.log(p1Score, p2Score)
console.log(dieRolls * (p1Score > p2Score ? p2Score : p1Score))