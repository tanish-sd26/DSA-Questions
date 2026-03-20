// For each k x k submatrix, compute min absolute difference between distinct values
var minAbsDiff = function(grid, k) {

    let m = grid.length;
    let n = grid[0].length;
    let res = [];

    for (let i = 0; i <= m - k; i++) {
        let row = [];

        for (let j = 0; j <= n - k; j++) {

            let set = new Set();

            // collect elements of k x k submatrix
            for (let x = i; x < i + k; x++) {
                for (let y = j; y < j + k; y++) {
                    set.add(grid[x][y]);
                }
            }

            let arr = Array.from(set).sort((a, b) => a - b);

            // if only one unique element → answer = 0
            if (arr.length <= 1) {
                row.push(0);
                continue;
            }

            // find minimum difference
            let minDiff = Infinity;
            for (let t = 1; t < arr.length; t++) {
                minDiff = Math.min(minDiff, arr[t] - arr[t - 1]);
            }

            row.push(minDiff);
        }

        res.push(row);
    }

    return res;
};