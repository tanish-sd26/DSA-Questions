// Count valid submatrices starting from (0,0)
var numberOfSubmatrices = function(grid) {
    
    let m = grid.length;
    let n = grid[0].length;
    
    let countX = 0; // total X till current cell
    let countY = 0; // total Y till current cell
    
    let result = 0;
    
    // Traverse entire grid
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            
            // Update counts based on current cell
            if (grid[i][j] === 'X') countX++;
            else if (grid[i][j] === 'Y') countY++;
            
            // Check conditions:
            // 1. equal X and Y
            // 2. at least one X
            if (countX === countY && countX > 0) {
                result++;
            }
        }
    }
    
    return result;
};