// Count submatrices starting at (0,0) with sum <= k using prefix sum
var countSubmatrices = function(grid, k) {

    let m = grid.length;
    let n = grid[0].length;
    let count = 0;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            // build prefix sum
            let top = i > 0 ? grid[i - 1][j] : 0;
            let left = j > 0 ? grid[i][j - 1] : 0;
            let diag = (i > 0 && j > 0) ? grid[i - 1][j - 1] : 0;

            grid[i][j] = grid[i][j] + top + left - diag;

            // check if valid submatrix
            if (grid[i][j] <= k) count++;
        }
    }

    return count;
};