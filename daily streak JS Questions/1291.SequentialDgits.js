/**
 * @param {number} low
 * @param {number} high
 * @return {number[]}
 */
var sequentialDigits = function (low, high) {
    const result = [];

    // Generate sequential numbers of length 2 to 9
    for (let len = 2; len <= 9; len++) {
        // Starting digit
        for (let start = 1; start <= 10 - len; start++) {
            let num = 0;
            let digit = start;

            // Build the sequential number
            for (let i = 0; i < len; i++) {
                num = num * 10 + digit;
                digit++;
            }

            if (num >= low && num <= high) {
                result.push(num);
            }
        }
    }
    return result.sort((a, b) => a - b);
};