import { readFileSync } from 'fs';
const fileName = process.argv[2]
let input: any[] = readFileSync(fileName, 'utf-8').split('\n').map(elem => elem.split(' '));

let state = input.map(el => el[0])
let bounds: any[][] = input.map(el => el[1].split(',').map((bound: string) => bound.split('=')[1].split('..').map(
    num => parseInt(num)
)))
// x=10..10,y=10..10,z=10..10
// console.log(bounds.map((bound: string) => bound.split('=')[1].split('..')))
console.log(state);
console.log(bounds);

let range = 100
let middle = Math.round(range/2)


const inBounds = (l: number, h: number): (false | number[]) =>{
    if (l >= -middle && l <= middle){
        return [l, Math.min(middle, h)]
    } else if (l <= -middle && h >= -middle){
        return [-middle, h]
    }

    return false
}
let boundsObj:{[key: string]: boolean} = {}
for (const [idx,coordinates] of bounds.entries()){
    let [x1, x2] = coordinates[0]
    let [y1, y2] = coordinates[1]
    let [z1, z2] = coordinates[2]

    x1 = x1 < x2 ? x1 : x2
    x2 = x1 < x2 ? x2 : x1 // x1 is always smaller
    y1 = y1 < y2 ? y1 : y2
    y2 = y1 < y2 ? y2 : y1
    z1 = z1 < z2 ? z1 : z2
    z2 = z1 < z2 ? z2 : z1 
    let xB = inBounds(x1, x2)
    let yB = inBounds(y1, y2)
    let zB = inBounds(z1, z2)
    if (xB && yB && zB){
        //switch cubes
        let newState = state[idx] === 'on' ? true : false
        for (let i = xB[0]; i <= xB[1]; i++){
            for (let j = yB[0]; j <= yB[1]; j++){
                for(let k = zB[0]; k <= zB[1]; k++){
                    let key = `${i},${j},${k}`
                    boundsObj[key] = newState
                }
            }
        }
    }

    // cases:
    // x1 is in the range, it's in
    // need to check x2 if x1 is below
    // if x1 is above return false


}
let cubesOn = 0
for (const prop in boundsObj){
    if (boundsObj[prop]){
        cubesOn++
    }
}
console.log(cubesOn)