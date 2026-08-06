'use strict';
 process.stdin.resume();
  process.stdin.setEncoding('utf-8');
   let inputString = '';
    let currentLine = 0;
     process.stdin.on('data', function(inputStdin) {
         inputString += inputStdin; });
          process.stdin.on('end', function() { 
            inputString = inputString.split(' ');
             main(); 
            });
             function readLine() {
                 return inputString[currentLine++];
                 }
                  class Calculator { divisorSum(n) {
                     let sum = 0;
                      for (let i = 1; i <= n; i++) {
                         if (n % i === 0) { sum += i; } 
                        }
                         return sum;
                         } 
                        }

                          function main() { 
                            const n = parseInt(readLine().trim(), 10); 
                            const myCalculator = new Calculator();

                             console.log("I implemented: AdvancedArithmetic");
                             console.log(myCalculator.divisorSum(n));

                             }