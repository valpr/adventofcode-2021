import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input = readFileSync(fileName, 'utf-8').split('\n').map(elem=>elem.split(' | '));

// one is two segments
// four is 4 segments
// seven is 3 segments
// 8 is 7 segments
// find the median?
// Then amount of fuel spent is difference between position and 
const outputVal = input.reduce((previousVal, currentValue) => {
    let current = previousVal
    for (const value of currentValue[1].split(' ')){
        if (value.length === 2 || value.length === 4 || value.length === 3 || value.length === 7)
            current += 1
    }
    return current
}, 0)

console.log(outputVal)
