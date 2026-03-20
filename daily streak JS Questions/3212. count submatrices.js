// Final correct solution
var numberOfSubmatrices = function(grid) {
    
    let m = grid.length;
    let n = grid[0].length;
    
    let result = 0;
    
    // Prefix for X and value
    let colSum = new Array(n).fill(0);
    let colX = new Array(n).fill(0);
    
    for (let i = 0; i < m; i++) {
        
        for (let j = 0; j < n; j++) {
            
            // Convert values
            let val = grid[i][j] === 'X' ? 1 : (grid[i][j] === 'Y' ? -1 : 0);
            
            colSum[j] += val;
            
            if (grid[i][j] === 'X') {
                colX[j] += 1;
            }
        }
        
        let sum = 0;
        let xCount = 0;
        
        for (let j = 0; j < n; j++) {
            
            sum += colSum[j];
            xCount += colX[j];
            
            // valid submatrix from (0,0) to (i,j)
            if (sum === 0 && xCount > 0) {
                result++;
            }
        }
    }
    
    return result;
};