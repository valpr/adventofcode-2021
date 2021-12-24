import { readFileSync, stat } from 'fs';
import { join } from 'path';
const fileName = process.argv[2]
let inp: string[] = readFileSync(fileName, 'utf-8').split('\n');
let stack: number[][] = []
let links: {[key: number]: number[]} = {}
let pairs = []
let assignments: {[key: number]: number} = {} 
for (let i = 0; i < 14; i++){
    pairs.push(
        [parseInt(inp[i* 18 + 5].slice(6)),parseInt(inp[i* 18 + 15].slice(6))]
    )
}
for (const [idx, pair] of pairs.entries()){
    if (pair[0] > 0){
        stack.push([idx, pair[1]])
    } else {
        let [j, bj]: number[] = stack.pop() || [0,0]
        links[idx] = [j, bj+ pair[0]]
    }
}
console.log(stack, links)
for (const [key, value] of Object.entries(links)){
    assignments[parseInt(key)] = Math.max(1, 1+value[1])
    assignments[value[0]] = Math.max(1, 1 - value[1])
}

let finalStr = ''
for (const prop in assignments){
    finalStr += assignments[prop]
}
console.log(assignments);
console.log(finalStr);