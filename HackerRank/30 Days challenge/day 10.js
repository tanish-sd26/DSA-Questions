'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



function main() {
    const n = parseInt(readLine().trim(), 10);
    const binary = n.toString(2);

let maxCount = 0;
let currentCount = 0;

for (let bit of binary) {
    if (bit === '1') {
        currentCount++;
        maxCount = Math.max(maxCount, currentCount);
    } else {
        currentCount = 0;
    }
}

console.log(maxCount);
}
