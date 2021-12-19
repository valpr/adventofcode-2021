import { readFileSync } from 'fs';
const fileName = process.argv[2]
const hx2binMap: {[key: string]: string} = {
    "0" : "0000",
    "1" : "0001",
    "2" : "0010",
    "3" : "0011",
    "4" : "0100",
    "5" : "0101",
    "6" : "0110",
    "7" : "0111",
    "8" : "1000",
    "9" : "1001",
    "A" : "1010",
    "B" : "1011",
    "C" : "1100",
    "D" : "1101",
    "E" : "1110",
    "F" : "1111",
}
const input = readFileSync(fileName, 'utf-8').split('').map(el => hx2binMap[el]).join('');


let versionSum = 0
// two types of packets, literal and operator

//think I need recursive functions in order to parse this
// each function will output [idx, value?]

const parsePacket = (index: number): [index: number, value: number] => {
    let current = index
    if (input.slice(index, index+6).length < 6){
        // end of string, maybe extra 0s
        return [0,0];
    }
    let version = input.slice(index, index+3)
    // next 3 bits are packet type ID
    versionSum += parseInt(version, 2)

    let packetID = input.slice(index+3, index+6)
    current = index + 6
    // Literal
    if (parseInt(packetID, 2) === 4){
        let numberInProgress = ''
        while (input[current] != '0'){
            numberInProgress += input.slice(current+1, current+5)
            current += 5
        }
        const finalValue = parseInt(`${numberInProgress}${input.slice(current+1, current+5)}`,2)
        current += 5
        return [current, finalValue]
    } else {
        // operator packet
        if (input[current] === '0'){
            // next 15 bits represent the total length in bits (1s and 0s)
            let totalLength = parseInt(input.slice(current+1, current+16),2)
            let ahead = 0
            current = current + 16
            while (ahead < totalLength){
                let [newIndex, _Num] = parsePacket(current)
                ahead += newIndex-current
                current = newIndex
            }
            return [current, 0] // incomplete
        } else {
            // the next 11 bits are the number of sub-packets contained by this packet (4 numbers per sub packet)
            let numPackets = parseInt(input.slice(current+1, current+ 12),2)
            current = current + 12
            for (let i = 0; i < numPackets; i++){
                // parse packets until numPackets is reached
                let _num;
                [current, _num] = parsePacket(current)
            }
            return [current, 0] // incomplete
        }
    }
}


parsePacket(0);

console.log(versionSum)