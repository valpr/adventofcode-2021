import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input = readFileSync(fileName, 'utf-8').split('\n').map(elem=>elem.split(' | '));

// one is two segments
// four is 4 segments
// seven is 3 segments
// 8 is 7 segments
// find the median?
// Then amount of fuel spent is difference between position and 
/*
 cccc
bf    d
bf    d
 bbff
g    e
g    e
 cccc
*/

//logic puzzle
// two letters is right side
// Then the six lettered value without both of one's values  is 6
// The other one that has all of 4's values is 9
// The last one is zero

// 7 is the one with 3 length
// 4 has 4 length
// 8 has 7 length



const outputVal = input.reduce((previousVal, currentValue) => {
    let inputArray = currentValue[0].split(' ')

    let locationOne = inputArray.findIndex(elem => elem.length === 2)
    let one = new Set(inputArray[locationOne])
    inputArray.splice(locationOne, 1);

    let locationFour = inputArray.findIndex(elem => elem.length === 4)
    let four = new Set(inputArray[locationFour])
    inputArray.splice(locationFour, 1);

    let locationSeven = inputArray.findIndex(elem => elem.length === 3)
    let seven = new Set(inputArray[locationSeven])
    inputArray.splice(locationSeven, 1);

    let locationEight = inputArray.findIndex(elem => elem.length === 7)
    let eight = new Set(inputArray[locationEight])
    inputArray.splice(locationEight, 1);

    // six doesn't have both of 1's elements
    let locationSix = inputArray.findIndex(elem => {
        if (elem.length != 6) {
            return false
        }
        let temp = new Set(elem)
        let match = 0
        for (let member of one){
            if (temp.has(member)) {
                match += 1
                if (match === 2){
                    return false
                }
            }
        }
        return true
    })
    let six = new Set(inputArray[locationSix])
    inputArray.splice(locationSix, 1);

    let locationNine = inputArray.findIndex(elem => {
        if (elem.length != 6) {
            return false
        }
        let temp = new Set(elem)
        for (let member of four){
            if (!temp.has(member)) return false
        }
        return true
    })
    let nine = new Set(inputArray[locationNine])
    inputArray.splice(locationNine, 1);

    let locationZero = inputArray.findIndex(elem => {
        if (elem.length != 6) {
            return false
        }
        return true
    })
    let zero= new Set(inputArray[locationZero])
    inputArray.splice(locationZero, 1);

    //Nine does not contain all members of 2, but does contain three and five
    let locationTwo = inputArray.findIndex(elem => {
        if (elem.length != 5) {
            return false
        }
        let temp = new Set(elem)
        for (let member of temp){
            if (!nine.has(member)) return true
        }
        return false
    })
    let two = new Set(inputArray[locationTwo])
    inputArray.splice(locationTwo, 1);

    // 6 has all of 5, but not 3
    let locationFive = inputArray.findIndex(elem => {
        if (elem.length != 5) {
            return false
        }
        let temp = new Set(elem)
        for (let member of temp){
            if (!six.has(member)) return false
        }
        return true
    })
    let five = new Set(inputArray[locationFive])
    inputArray.splice(locationFive, 1);

    // left over
    let three = new Set(inputArray[0])
    // two, three get mixed up
    const isEqual = (val: string, num: Set<string>) => {
        if (num.size === val.length){
            for (let letter of val){
                if (!num.has(letter)) return false   
            }
            return true
        }
        return false
    }
    const numbers = [zero, one, two, three, four, five, six, seven, eight, nine]
    let current = 0;
    for (const value of currentValue[1].split(' ')){
        for (const [idx, number] of numbers.entries()){
            if (isEqual(value, number)){
                current = current * 10
                current += idx
                break;
            }
        }
    }
    
    return previousVal+ current
}, 0)

console.log(outputVal)
