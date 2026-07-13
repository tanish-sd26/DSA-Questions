/**
 * @param {number[][]} grid
 * @param {number} health
 * @return {boolean}
 */
var findSafeWalk = function (grid, health) {
    const m = grid.length;
    const n = grid[0].length;

    const dirs = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    // Health after entering the starting cell
    const startHealth = health - grid[0][0];

    if (startHealth <= 0) return false;

    // best[r][c] = maximum remaining health when reaching (r, c)
    const best = Array.from({ length: m }, () => Array(n).fill(-1));
    best[0][0] = startHealth;

    const queue = [[0, 0, startHealth]];
    let head = 0;

    while (head < queue.length) {
        const [r, c, currHealth] = queue[head++];

        if (r === m - 1 && c === n - 1) {
            return true;
        }

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 &&
                nr < m &&
                nc >= 0 &&
                nc < n
            ) {
                const newHealth = currHealth - grid[nr][nc];

                if (
                    newHealth > 0 &&
                    newHealth > best[nr][nc]
                ) {
                    best[nr][nc] = newHealth;
                    queue.push([nr, nc, newHealth]);
                }
            }
        }
    }
    return false;
};