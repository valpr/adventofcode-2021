import { readFileSync } from 'fs';
const fileName = process.argv[2]

let [algo, image]: string[] = readFileSync(fileName, 'utf-8').split('\n\n');
let convertedImage = image.split('\n').map(line => line.split('').map(char => char === '.' ? '0' : '1'))


const addRing = (expand: ('0' | '1')[][], outside: ('0' | '1')) => {
    //given an NxM array, return N+2 x M+2 array, where all outer elements are '.'
    let newN = expand.length + 2
    let newM = expand[0].length + 2
    let newExpand: ('0' | '1')[][] = Array.from(Array(newN), _ => Array(newM).fill(outside))
    for (let i = 1; i < newN - 1; i++){
        newExpand[i] = [outside, ...expand[i-1], outside]
    }
    return newExpand
}



let currentImage = convertedImage
for (let c = 0; c < 2; c++){
    let def: ('0' | '1') = c % 2 === 0 ? '0' : '1';
    let newImage = addRing(currentImage, def);
    currentImage = addRing(currentImage, def);    
    let lightCount = 0
    for (let i = 0; i < currentImage.length; i++){
        for (let j = 0; j < currentImage[i].length; j++){
            // run the image algorithm on each char
            let directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1],[0, 0], [0, 1], [1, -1], [1, 0], [1, 1]]
            let binaryString = ''
            for (const [y, x] of directions){
                let dy = i + y
                let dx = j + x
                let insert = def // default if it doesn't exist
                if (currentImage[dy] && typeof currentImage[dy][dx] === 'string'){
                    insert = currentImage[dy][dx]
                }
                binaryString = `${binaryString}${insert}`
            }
            let binaryIndex = parseInt(binaryString, 2)
            // console.log(binaryString, binaryIndex)
            newImage[i][j] = algo[binaryIndex] === '#' ? '1' : '0'
            if (newImage[i][j] === '1'){
                lightCount++
            }
        }
    }
    console.log('Pass: ', c)
    console.log('Lights: ', lightCount)
    // for (const line of currentImage.slice(0,10)){
    //     console.log(line.join('').substring(0,10));
    // }
    // console.log('---')
    // for (const line of newImage.slice(0,10)){
    //     console.log(line.join('').substring(0,10));
    // }
    currentImage = newImage // doesn't make a copy, but that's OK because of how addRing works
}

// get the binary number from the surrounding pixels as the index
// change the value based on index in "algo"
// must evaluate every pixel outside of the initial picture as well
// easily done each step by adding a ring of '.'s on the outside of the picture
// probably going to use 0s and 1s instead for convenience





