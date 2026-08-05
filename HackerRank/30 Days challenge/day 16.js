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
   const S = readLine();
    try { const num = parseInt(S, 10);
         if (isNaN(num)) {
             throw new Error();
             } 
             console.log(num);
             }
              catch (e) {
                 console.log("Bad String");
                 } 
}