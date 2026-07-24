/**
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function (nums) {
    const MAX_XOR = 2048;

    // dp[count][xor] = true if xor can be formed using exactly 'count' numbers
    const dp = Array.from({ length: 4 }, () => Array(MAX_XOR).fill(false));

    dp[0][0] = true;

    for (const num of nums) {
        for (let count = 2; count >= 0; count--) {
            for (let x = 0; x < MAX_XOR; x++) {
                if (dp[count][x]) {
                    dp[count + 1][x ^ num] = true;
                }
            }
        }
    }

    let answer = 0;

    for (let x = 0; x < MAX_XOR; x++) {
        if (dp[1][x] || dp[3][x]) {
            answer++;
        }
    }

    return answer;
};