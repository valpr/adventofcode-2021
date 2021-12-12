import { readFileSync } from 'fs';
const fileName = process.argv[2]
const input:string [][] = readFileSync(fileName, 'utf-8').split('\n').map(elem=>elem.split('-'));
let numPaths = 0
const paths: {[key: string] : {
    big: boolean
    routes: string[]
}} = {}
for (const path of input){
    const place1 = path[0]
    const place2 = path[1]
    // if exists, add
    if (paths[place1]){
        paths[place1].routes.push(place2)
    } else {
        paths[place1] = {
            big: place1 >= 'A' && place1 <= 'Z',
            routes: [place2]
        }
    }
    if (paths[place2]){
        paths[place2].routes.push(place1)
    } else {
        paths[place2] = {
            big: place2 >= 'A' && place2 <= 'Z',
            routes: [place1]
        }
    }
}

// now expand across routes until reach the end
// if no route, kill this path
// console.log(paths)

const expand = (currentNode: string, traversed: {[key: string]: boolean}, singleSmall: boolean) => {
    console.log(currentNode)
    if (currentNode === 'end'){
        numPaths += 1
        return
    }
    let possibleRoutes = paths[currentNode].routes.filter(elem => elem != 'start' && (paths[elem].big === true || traversed[elem] != true || singleSmall))
    for (const route of possibleRoutes){
        let newSingleSmall = singleSmall && (traversed[route] != true || paths[route].big === true)
        expand(route, {...traversed, [currentNode]: true }, newSingleSmall)
    }
}
expand('start', {start: true}, true);

console.log(numPaths)