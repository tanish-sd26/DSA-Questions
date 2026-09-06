/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
    const m = s.length;
    const n = t.length;

    const dp = Array.from({ length: m + 1 }, () =>
        new Array(n + 1).fill(0)
    );

    // Empty t can always be formed in exactly one way
    dp[0][0] = 1;

    for (let i = 1; i <= m; i++) {
        dp[i][0] = 1;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {

            if (s[i - 1] === t[j - 1]) {
                // Use s[i-1] OR skip s[i-1]
                dp[i][j] =
                    dp[i - 1][j - 1] +
                    dp[i - 1][j];
            } else {
                // Current character cannot be used
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[m][n];
};