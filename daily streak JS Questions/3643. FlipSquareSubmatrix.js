// Flip k x k submatrix vertically (reverse rows inside the square)
var reverseSubmatrix = function(grid, x, y, k) {
    
    for (let i = 0; i < Math.floor(k / 2); i++) {
        
        let row1 = x + i;
        let row2 = x + k - 1 - i;
        
        for (let j = 0; j < k; j++) {
            let col = y + j;

            // swap elements column-wise
            [grid[row1][col], grid[row2][col]] = [grid[row2][col], grid[row1][col]];
        }
    }
    
    return grid;
};