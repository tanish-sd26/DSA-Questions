'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let inputLines = [];
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputLines = inputString.split('\n');
    inputString = '';
    main();
});

function readLine() {
    return inputLines[currentLine++];
}

// JS mein generics nahi hote, isliye normal function likha
// (koi bhi type ka array le sakta hai kyunki JS dynamically typed hai)
function printArray(arr) {
    for (const element of arr) {
        console.log(element);
    }
}

function main() {
    // Integer array read karo (line-by-line)
    const n = parseInt(readLine().trim(), 10);
    const integerArray = [];
    for (let i = 0; i < n; i++) {
        integerArray.push(parseInt(readLine().trim(), 10));
    }
    printArray(integerArray);

    // String array read karo
    const m = parseInt(readLine().trim(), 10);
    const stringArray = [];
    for (let i = 0; i < m; i++) {
        stringArray.push(readLine().trim());
    }
    printArray(stringArray);
}