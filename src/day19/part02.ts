import { readFileSync } from 'fs';

const fileName = process.argv[2]

const distance = (coord1: number[], coord2: number[]) => {
    return coord1.reduce((acc, current, idx) => {
        return acc + Math.abs(current- coord2[idx])
    }, 0)
}

// create a map of each beacon with three nearest neightbours
const createNeighbourMap = (beacons: number[][]) => {
    let neighbourMap: {[key: number]: number[][]} = {}
    for (const beacon of beacons){
        let peerDistances : {[key: number]: number[]} = {}
        for (const peerBeacon of beacons){
            if (peerBeacon != beacon){
                peerDistances[distance(beacon, peerBeacon)] = peerBeacon
            }
        }
        // find the two nearest beacon neighbours
        let sortedPDistances = Object.keys(peerDistances).map(el => parseInt(el)).sort((a,b) => a-b)
        let [closestA, closestB] = [sortedPDistances[0], sortedPDistances[1]]
        // create a hash of the distance between all 3 neighbours
        let [neighbourA, neighbourB] = [peerDistances[closestA], peerDistances[closestB]]
        let hash = (closestA + closestB) * distance(neighbourA, neighbourB)
        neighbourMap[hash] = [beacon, neighbourA, neighbourB]
    }
    return neighbourMap
}

const findMatchingNeighbours = (fieldMap: {[key: number]: number[][]}, scannerMaps: any[] ) => {
    for (const fieldHash of Object.keys(fieldMap)){
        for (const [scanner, scannerMap] of scannerMaps){
            for (const scannerHash of Object.keys(scannerMap)){
                if (scannerHash === fieldHash){
                    let fieldNeighbours = fieldMap[parseInt(scannerHash)]
                    let scannerNeighbours = scannerMap[scannerHash]
                    return [scanner, fieldNeighbours, scannerNeighbours]
                }
            }
        }
    }
}

const findOrientation = (fieldNeighbours: any, scannerNeighbours: any): [any, any, number[]] => {
    let offset = Array(3).fill(null)
    let direction = Array(3).fill(null)
    let rotation = Array(3).fill(null)
    for (let i = 0 ; i < 3; i ++){
        if (offset[i] != null){
            continue;
        }
        for (let j = 0; j < 3 ; j++){
            for (let k of [-1, 1]){
                let offsets = new Set()
                for (let l = 0; l < 3; l++){
                        offsets.add(fieldNeighbours[l][i] - scannerNeighbours[l][j] * k)
                }
                if (offsets.size === 1){
                    offset[i] = Array.from(offsets.values())[0]
                    direction[i] = k
                    rotation[i] = j
                }
            }
        }
    }
    return [offset, direction, rotation]
}

const reorientCoords = (orientation: [any, any, number[]], beacons: any[]) => {
    let [offset, direction, rotation] = orientation
    return beacons.map((beacon: number[]) => {
        return beacon.map((_coord, index: number) => beacon[rotation[index]] * direction[index] + offset[index])
    })
}

const getMaxDistance = (scannerLocations: number[][]): [number,  [number,number], number[][]] => {
    let maxDistance: [number,  [number,number], number[][]] = [0, [0, 0], [scannerLocations[0], scannerLocations[0]]]
    for (let i = 0; i < scannerLocations.length-1; i++){
        for (let j = i + 1; j < scannerLocations.length; j++){
            let currentDistance = distance(scannerLocations[i], scannerLocations[j])
            if (currentDistance > maxDistance[0]){
                maxDistance = [currentDistance, [i, j], [scannerLocations[i], scannerLocations[j]]]
            }
        }
    }
    return maxDistance
}


let scannerList: number[][][] = readFileSync(fileName, 'utf-8').split('\n\n').map(el => el.split('\n').slice(1).map(coords => coords.split(',').map(coord => parseInt(coord))));
let firstScanner = scannerList.shift() || scannerList[0]
let field: {[key: string]: number[]} = {}
for (const values of firstScanner){
    field[`${values}`] = values
}
let scannerLocations = []
let scannerMaps = scannerList.map((scanner) => [scanner, createNeighbourMap(scanner)])
while (scannerMaps.length > 0){
    let fieldMap = createNeighbourMap(Object.values(field))
    let [scanner, fieldNeighbours, scannerNeighbours]: any = findMatchingNeighbours(fieldMap, scannerMaps)

    for (let i = 0; i < scannerMaps.length; i++){
        if (scannerMaps[i][0] === scanner){
            scannerMaps.splice(i, 1)
            break;
        }
    }

    let orientation = findOrientation(fieldNeighbours, scannerNeighbours)
    let [scannerCoord, ...vars] = orientation
    
    scannerLocations.push(scannerCoord)

    let newCoords = reorientCoords(orientation, scanner)
    for (const coord of newCoords){
        field[`${coord}`] = coord
    }
}

// console.log(scannerLocations)
scannerLocations.unshift([0,0,0]) //initial scanner
console.log('Distance details')
console.log(getMaxDistance(scannerLocations))
let beaconCount = Object.keys(field).length

// console.log(field);
console.log('beacons: ', beaconCount)