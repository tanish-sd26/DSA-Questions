'use strict'; 

process.stdin.resume(); 
process.stdin.setEncoding('utf-8'); 

 let inputString = ''; 
 let inputLines = []; 
 let currentLine = 0; 
 process.stdin.on('data', function(inputStdin) { inputString += inputStdin; }); 
 process.stdin.on('end', function() { inputLines = inputString.split(' '); 
    inputString = ''; main(); }
 );
 function readLine() {
     return inputLines[currentLine++];
     } 
  class Difference { 
    constructor(a) {
         this.elements = a;
          this.maximumDifference = 0;
         } computeDifference() {
             const min = Math.min(...this.elements);
              const max = Math.max(...this.elements); 
              this.maximumDifference = max - min; } 
            } function main() 
            { 
                const n = parseInt(readLine().trim(), 10); 
                const a = readLine() .trim() .split(' ') .map(Number);
                const d = new Difference(a); d.computeDifference(); console.log(d.maximumDifference); 
                }