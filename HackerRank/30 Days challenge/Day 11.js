/*
Platform : HackerRank
Day      : 11
Problem  : 2D Arrays
Pattern  : Matrix Traversal
Time     : O(1)
Space    : O(1)
*/

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

    let arr = Array(6);

    for (let i = 0; i < 6; i++) {
        arr[i] = readLine()
            .trim()
            .split(' ')
            .map(Number);
    }

    let maxSum = -63;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {

            let hourglassSum =
                arr[i][j] +
                arr[i][j + 1] +
                arr[i][j + 2] +
                arr[i + 1][j + 1] +
                arr[i + 2][j] +
                arr[i + 2][j + 1] +
                arr[i + 2][j + 2];

            if (hourglassSum > maxSum) {
                maxSum = hourglassSum;
            }
        }
    }

    console.log(maxSum);
}