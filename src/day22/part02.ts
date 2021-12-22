import { readFileSync } from 'fs';
const fileName = process.argv[2]
let input: any[] = readFileSync(fileName, 'utf-8').split('\n').map(elem => elem.split(' '));

let state = input.map(el => el[0])
let bounds: any[][] = input.map(el => el[1].split(',').map((bound: string) => bound.split('=')[1].split('..').map(
    num => parseInt(num)
)))

let xRegions = []
let yRegions = []
let zRegions = []


for (const coordinates of bounds){
    let [x1, x2] = coordinates[0]
    let [y1, y2] = coordinates[1]
    let [z1, z2] = coordinates[2]
    xRegions.push(x1, x2)
    yRegions.push(y1, y2)
    zRegions.push(z1, z2)
}
xRegions.sort((a, b) => a-b)
yRegions.sort((a, b) => a-b)
zRegions.sort((a, b) => a-b)

const eliminateDupes = (arr : number[]): any[] => {
    let temp: number[] = []
    let n = arr.length
    for (let i = 0; i < n-1; i++){
        if (arr[i] != arr[i+1]) {
            temp.push(arr[i])
        }
    }
    if (arr[n-1] != arr[n-2]){
        temp.push(arr[n-1])
    }

    // now create the 'in-between regions'

    let m = temp.length;
    let otherTemp: any[] = [{
        c1: temp[0],
        c2: temp[0]
    }]
    let previousBoundary = temp[0]
    for (let j = 1; j < m; j++){
        if (temp[j]- previousBoundary > 1){
            otherTemp.push({
                c1: previousBoundary+1,
                c2: temp[j] -1
            })
        }
        otherTemp.push({
            c1: temp[j],
            c2: temp[j]
        })
        previousBoundary= temp[j]
    }

    return otherTemp
}

xRegions = eliminateDupes(xRegions);
yRegions = eliminateDupes(yRegions);
zRegions = eliminateDupes(zRegions);

let n = xRegions.length;
let m = yRegions.length;
let o = zRegions.length;

const reactor: boolean[][][] = []
for (let i = 0; i < n; i++){
    let temp: boolean[][] = []
    for (let j = 0; j < m; j++){
        let innerTemp: boolean[] = Array(o).fill(false)
        temp.push(innerTemp)
    }
    reactor.push(temp)
}


let cubesOn = 0

const inBounds = (c1: number, c2: number, cRegion: any[]) => {
    let bounds = [-1, -1]
    for(let i = 0; i < cRegion.length; i++){
        if (cRegion[i].c1 === c1){
            bounds[0] = i
        } 
        if (cRegion[i].c1 === c2) {
            bounds[1] = i
        }
    }
    if (bounds[0] === -1 || bounds[1] === -1){
        console.log('ALERT:', c1, c2)
    }
    return bounds
}

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

    // Now I need to find the bounds in the list
    // x2 - x1 + 1 (because inclusive)
    let newState = state[idx] === 'on' ? true : false
    // basically need to find x1 and x2 in xRegions, then highlight the regions between them

    let xB = inBounds(x1, x2, xRegions) // xB represents the right indexes in the 'regions'
    let yB = inBounds(y1, y2, yRegions)
    let zB = inBounds(z1, z2, zRegions)
    // console.log(xB)
    // console.log(yB)
    // console.log(zB)
    for (let i = xB[0]; i <= xB[1]; i++){
        for (let j = yB[0]; j <= yB[1]; j++){
            for(let k = zB[0]; k <= zB[1]; k++){
                if (typeof reactor[i] === 'undefined' || typeof reactor[i][j] === 'undefined' || typeof reactor[i][j][k] === 'undefined'){
                    console.log(i, j, k);
                }
                // console.log(i, j, k);
                reactor[i][j][k] = newState
            }
        }
    }
    console.log('entry done', new Date().toLocaleTimeString())

}

for (let i = 0; i < n; i++){
    for (let j = 0; j < m; j++){
        for(let k = 0; k < o; k++){
            if (reactor[i][j][k]){
                let dx = xRegions[i].c2 - xRegions[i].c1 + 1
                let dy = yRegions[j].c2 - yRegions[j].c1 + 1
                let dz = zRegions[k].c2 - zRegions[k].c1 + 1
                cubesOn += dx * dy * dz
            }
        }
    }
}
console.log(cubesOn === 2758514936282235)

console.log('total cubes: ', cubesOn)