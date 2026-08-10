/**
 * @param {number[]} piles
 * @return {number}
 */
var stoneGameII = function(piles) {
    const n = piles.length;

    // suffix sums
    const suffix = Array(n + 1).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        suffix[i] = suffix[i + 1] + piles[i];
    }

    const memo = Array.from({ length: n }, () => Array(n + 1).fill(-1));

    function dfs(i, M) {
        if (i >= n) return 0;

        // can take all remaining piles
        if (i + 2 * M >= n) {
            return suffix[i];
        }

        if (memo[i][M] !== -1) {
            return memo[i][M];
        }

        let best = 0;

        for (let X = 1; X <= 2 * M; X++) {
            best = Math.max(
                best,
                suffix[i] - dfs(i + X, Math.max(M, X))
            );
        }

        return memo[i][M] = best;
    }

    return dfs(0, 1);
};