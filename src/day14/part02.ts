import { access, accessSync, readFileSync } from 'fs';
const fileName = process.argv[2]
const [template, pairs] = readFileSync(fileName, 'utf-8').split('\n\n');
const legend: {[key: string]: string} = pairs.split('\n').map(elem => elem.split(' -> ')).reduce((acc, currValue) => {
    return {...acc, [currValue[0]]: currValue[1]}
}, {});


// instead of keeping track of the string itself, 
// we can keep track of the combos as 'buckets' instead and generate new numbers
// based on that, similar to a previous day (counting sort)
// order doesn't matter
let steps = 0


let letterCount: {[key: string]: number} = {}

let currentTemplate: {[key: string]: number} = {}
for (const [idx, letter] of template.substring(0,template.length-1).split('').entries()){
    const combo = letter+template[idx+1]
    currentTemplate[combo] = currentTemplate[combo] ? currentTemplate[combo] + 1 : 1
    letterCount[letter] = letterCount[letter] ? letterCount[letter] + 1 : 1
}

letterCount[template[template.length-1]] = letterCount[template[template.length-1]] ? letterCount[template[template.length-1]] + 1 : 1

while (steps < 40){
    let newTemplate: {[key: string]: number} = {}
    for (const combo in currentTemplate){
        // each combo will create two new entries
        const newLetter = legend[combo]
        const currNum = currentTemplate[combo]
        const [new1, new2] = [`${combo[0]}${newLetter}`,`${newLetter}${combo[1]}`]
        //add or make new, according to previous number
        letterCount[newLetter] = letterCount[newLetter] ? letterCount[newLetter] + currNum : currNum
        newTemplate[new1] = newTemplate[new1] ? newTemplate[new1] + currNum : currNum
        newTemplate[new2] = newTemplate[new2] ? newTemplate[new2] + currNum : currNum
    }


    currentTemplate = newTemplate
    steps++
    // console.log(currentTemplate)
}


const obj = Object.values(letterCount).sort((a,b)=> a-b)

console.log(obj[obj.length-1] - obj[0])
