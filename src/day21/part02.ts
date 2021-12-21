import { readFileSync } from 'fs';
const fileName = process.argv[2]
let [p1, p2]: number[] = readFileSync(fileName, 'utf-8').split('\n').map(elem => parseInt(elem.split(': ')[1]));
let winCon = 21
let p1Wins = 0
let p2Wins = 0
// ideas:
// have an object for game state?
// use a queue to compute all possibilities?
// keep track of how many games there are per state
// so, rolling every permutation of (1, 2, 3) will have 27 total permutations:
// 1 3 game
// 3 4 games
// 6 5 games
// 7 6 games
// 6 7 games
// 3 8 games
// 1 9 game

// convert this to n
// Since the dice rolls themselves don't matter, only the permutations will now
// 1 --3*n
// 3 --2*(n)+(n+1)
// 6 --(n+2)+(2*n+1)
// 7 --3*(n+1)
// 6 --2*(n+1)+(n+2)
// 3 --2*(n+2)+(n+1)
// 1 --3*(n+2)
//
// keep track of: P1Score, P2Score, current p1Space, current p2Space
// scores are bounded from 0 and 20 (because if it's 21+ game is already over)
// spaces are bounded from 1 to 10 (be careful of off by 1s) 
// don't want to do top down because there will be a lot of unused game states

// queue of objects
let queue = [{
    p1score: 0,
    p2score: 0,
    p1space: p1,
    p2space: p2,
    turn: 1,
    numSame: 1
}]

while (queue.length != 0){
    let newQueue: any = {
        
    }
    for (const game of queue){
        // is this a finished game?
        if (game.p1score >= winCon){
            p1Wins += game.numSame
        } else if (game.p2score >= winCon){
            p2Wins += game.numSame
        } else {
            const permutations = [1,3,6,7,6,3,1]
            const sum = [3,4,5,6,7,8,9]
            for (let i = 0; i < permutations.length; i++){
                let newP1Score = game.p1score
                let newP2Score = game.p2score
                let newP1Space = game.p1space
                let newP2Space = game.p2space
                let newturn = game.turn === 0 ? 1 : 0
                //index by the top 5
                let newNumSame = game.numSame * permutations[i]
                if (game.turn){ // p1's turn
                    newP1Space += sum[i]
                    newP1Space = newP1Space % 10 === 0 ? 10 : newP1Space % 10
                    newP1Score += newP1Space
                } else { // p2's turn
                    newP2Space += sum[i]
                    newP2Space = newP2Space % 10 === 0 ? 10 : newP2Space % 10
                    newP2Score += newP2Space    
                }
                let key = `${newP1Score},${newP2Score},${newP1Space},${newP2Space},${newturn}`
                newQueue[key] = newQueue[key] ? newQueue[key] + newNumSame : newNumSame
            }
        }
    }
    let freshQ = []
    for (const gameType in newQueue){
        const [p1s, p2s, p1sp, p2sp, pturn] = gameType.split(",").map(el => parseInt(el));
        freshQ.push({
            p1score: p1s,
            p2score: p2s,
            p1space: p1sp,
            p2space: p2sp,
            turn: pturn,
            numSame: newQueue[gameType]
        });
    }
    queue = freshQ
    // console.log(queue);
    // console.log(newQueue)
}
// 116741133558209
// 113467910521040
console.log(p1Wins, p2Wins)

