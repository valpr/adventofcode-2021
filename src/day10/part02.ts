import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input:string [][] = readFileSync(fileName, 'utf-8').split('\n').map(elem=>elem.split(''));


let scores = []
for (let i = 0; i < input.length; i++){
    const stack: string[] = []
    let incomplete = true
    for (let j = 0; j < input[i].length; j++){
        let curr = input[i][j]
        if (curr === ')'){
            if (stack[stack.length - 1] != '('){
                incomplete = false
                break;
            } else {
                stack.pop()
            }
        } else if (curr === ']'){
            if (stack[stack.length - 1] != '['){
                incomplete = false

                break;
            } else {
                stack.pop()
            }
        } else if (curr === '}'){
            if (stack[stack.length - 1] != '{'){
                incomplete = false

                break;
            } else {
                stack.pop()
            }
        } else if (curr === '>'){
            if (stack[stack.length - 1] != '<'){
                incomplete = false

                break;
            } else {
                stack.pop()
            }
        } else {
            stack.push(curr)
        }
    }
    const scoringObj: { [key: string]: number} = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4
    }
    let score = 0
    if (incomplete){
        for (const bracket of stack.reverse()){
            score *= 5
            score += scoringObj[bracket]
        }
        scores.push(score)
    }

}
scores.sort((a,b) => a-b)
console.log(scores)
console.log(scores[Math.floor(((scores.length-1)/2))])