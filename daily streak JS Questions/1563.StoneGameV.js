var stoneGameV = function(stoneValue) {
    const n = stoneValue.length;

    // Prefix sum
    const prefix = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + stoneValue[i];
    }

    function sum(l, r) {
        return prefix[r + 1] - prefix[l];
    }

    // dp[l][r] = maximum score Alice can obtain
    // from stoneValue[l...r]
    const dp = Array.from(
        { length: n },
        () => new Array(n).fill(0)
    );

    // Length of subarray
    for (let len = 2; len <= n; len++) {
        for (let l = 0; l + len - 1 < n; l++) {
            const r = l + len - 1;

            for (let i = l; i < r; i++) {
                const left = sum(l, i);
                const right = sum(i + 1, r);

                if (left < right) {
                    dp[l][r] = Math.max(
                        dp[l][r],
                        left + dp[l][i]
                    );
                } else if (left > right) {
                    dp[l][r] = Math.max(
                        dp[l][r],
                        right + dp[i + 1][r]
                    );
                } else {
                    dp[l][r] = Math.max(
                        dp[l][r],
                        left + Math.max(
                            dp[l][i],
                            dp[i + 1][r]
                        )
                    );
                }
            }
        }
    }

    return dp[0][n - 1];
};