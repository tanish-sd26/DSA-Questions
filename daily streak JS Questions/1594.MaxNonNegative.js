// Maximum product path in grid using DP (track min & max because of negatives)
var maxProductPath = function(grid) {
    
    let m = grid.length;
    let n = grid[0].length;
    let MOD = 1000000007;

    // dp arrays for max and min product
    let maxDp = Array.from({ length: m }, () => Array(n).fill(0));
    let minDp = Array.from({ length: m }, () => Array(n).fill(0));

    maxDp[0][0] = grid[0][0];
    minDp[0][0] = grid[0][0];

    // first column
    for (let i = 1; i < m; i++) {
        maxDp[i][0] = maxDp[i-1][0] * grid[i][0];
        minDp[i][0] = maxDp[i][0];
    }

    // first row
    for (let j = 1; j < n; j++) {
        maxDp[0][j] = maxDp[0][j-1] * grid[0][j];
        minDp[0][j] = maxDp[0][j];
    }

    // fill DP
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {

            let val = grid[i][j];

            let candidates = [
                maxDp[i-1][j] * val,
                minDp[i-1][j] * val,
                maxDp[i][j-1] * val,
                minDp[i][j-1] * val
            ];

            maxDp[i][j] = Math.max(...candidates);
            minDp[i][j] = Math.min(...candidates);
        }
    }

    let result = maxDp[m-1][n-1];

    return result < 0 ? -1 : result % MOD;
};