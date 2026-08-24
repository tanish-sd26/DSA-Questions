var stoneGameVIII = function(stones) {
    const n = stones.length;

    // Prefix sums
    const prefix = new Array(n);
    prefix[0] = stones[0];

    for (let i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] + stones[i];
    }

    // dp represents the best score difference
    let dp = prefix[n - 1];

    // We only need states from index n-2 down to 1.
    for (let i = n - 2; i >= 1; i--) {
        dp = Math.max(dp, prefix[i] - dp);
    }

    return dp;
};