/**
 * @param {number} n
 * @return {boolean}
 */
var winnerSquareGame = function(n) {
    const dp = Array(n + 1).fill(false);

    for (let i = 1; i <= n; i++) {
        for (let s = 1; s * s <= i; s++) {
            if (!dp[i - s * s]) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[n];
};