import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input:string [][] = readFileSync(fileName, 'utf-8').split('\n').map(elem=>elem.split(''));


let score = 0
for (let i = 0; i < input.length; i++){
    const stack: string[] = []
    for (let j = 0; j < input[i].length; j++){
        let curr = input[i][j]
        if (curr === ')'){
            if (stack[stack.length - 1] != '('){
                score += 3
                break;
            } else {
                stack.pop()
            }
        } else if (curr === ']'){
            if (stack[stack.length - 1] != '['){
                score += 57
                break;
            } else {
                stack.pop()
            }
        } else if (curr === '}'){
            if (stack[stack.length - 1] != '{'){
                score += 1197
                break;
            } else {
                stack.pop()
            }
        } else if (curr === '>'){
            if (stack[stack.length - 1] != '<'){
                score += 25137
                break;
            } else {
                stack.pop()
            }
        } else {
            stack.push(curr)
        }
    }
}
console.log(score)