import { readFileSync } from 'fs';
const fileName = process.argv[2]
const [template, pairs] = readFileSync(fileName, 'utf-8').split('\n\n');
const legend: {[key: string]: string} = pairs.split('\n').map(elem => elem.split(' -> ')).reduce((acc, currValue) => {
    return {...acc, [currValue[0]]: currValue[1]}
}, {});

let steps = 0
let currentTemplate = template
while (steps < 10){
    let newTemplate = `${currentTemplate[0]}`
    for (const [idx, letter] of currentTemplate.substring(0,currentTemplate.length-1).split('').entries()){
        const combo = letter+currentTemplate[idx+1]
        const insert = legend[combo]
        newTemplate+= insert+combo[1]
    }

    currentTemplate = newTemplate
    steps++
    // console.log(currentTemplate)
}


const obj = Object.values(currentTemplate.split('').reduce((acc: {[key: string]: number}, currVal) => {
    return {...acc, [currVal]: acc[currVal] ? acc[currVal] + 1 : 1}
}, {})).sort((a,b)=> a-b)

console.log(obj[obj.length-1] - obj[0])
