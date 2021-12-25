import { readFileSync } from 'fs';
const fileName = process.argv[2]
let inp: string[] = readFileSync(fileName, 'utf-8').split('\n');


let change = true
let n = inp.length;
let m = inp[0].length;
const getNextIndex = (vertical: boolean, index: number ) => {
    if (vertical){
        return index + 1 === n ? 0 : index + 1
    }
    return index + 1 === m ? 0 : index + 1
}
let steps = 0
while (change){
    steps ++
    // for (const line of inp){
    //     console.log(line)
    // }
    // console.log('----')
    change = false
    let skipOne = false
    let interInp = []
    for (let i = 0; i < inp.length; i++){
        let newLine = ''
        for (let j = 0; j < inp[i].length; j++){
            if (skipOne){
                skipOne = false
                continue;
            }
            if (inp[i][j] === '>'){
                let nextInput = getNextIndex(false, j)
                if (inp[i][nextInput] === '.'){
                    if (nextInput === 0){
                        let newSlice = newLine.slice(1, newLine.length)
                        newLine = `>${newSlice}.`
                    } else {
                        newLine = `${newLine}.>`
                        skipOne = true
                    }
                    change = true
                }  else {
                    newLine = `${newLine}${inp[i][j]}`
                }
            } else {
                newLine = `${newLine}${inp[i][j]}`
            }
        }
        if (skipOne){
            newLine = newLine.slice(0, newLine.length-1)
        }
        skipOne = false
        interInp.push(newLine);
    }

    // for (const line of interInp){
    //     console.log(line)
    // }
    // console.log('----')

    skipOne = false
    let finalInp = Array(n).fill('')
    for (let i = 0; i < interInp[0].length; i++){
        for (let j = 0; j < interInp.length; j++){
            if (skipOne){
                skipOne = false
                continue;
            }
            if (interInp[j][i] === 'v'){
                let nextInput = getNextIndex(true, j)
                if (interInp[nextInput][i] === '.'){
                    if (nextInput === 0){
                        finalInp[j] = `${finalInp[j]}.`
                        let slicedTop = finalInp[nextInput].slice(0, finalInp[nextInput].length -1)
                        finalInp[nextInput] = `${slicedTop}v`
                    } else {
                        finalInp[j] = `${finalInp[j]}.`
                        finalInp[nextInput] = `${finalInp[nextInput]}v`
                        skipOne = true
                    }

                    change = true
                } else {
                    finalInp[j] = `${finalInp[j]}${interInp[j][i]}`
                }
            } else {
                finalInp[j] = `${finalInp[j]}${interInp[j][i]}`
            }
        }
    }
    // for (const line of finalInp){
    //     console.log(line)
    // }
    inp = [...finalInp]
}
console.log(steps)