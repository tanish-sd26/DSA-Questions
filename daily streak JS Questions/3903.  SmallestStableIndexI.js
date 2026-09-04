/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var firstStableIndex = function(nums, k) {
    const n = nums.length;

    const prefixMax = new Array(n);
    const suffixMin = new Array(n);

    // Build prefix maximum
    prefixMax[0] = nums[0];

    for (let i = 1; i < n; i++) {
        prefixMax[i] = Math.max(prefixMax[i - 1], nums[i]);
    }

    // Build suffix minimum
    suffixMin[n - 1] = nums[n - 1];

    for (let i = n - 2; i >= 0; i--) {
        suffixMin[i] = Math.min(suffixMin[i + 1], nums[i]);
    }

    // Find the first stable index
    for (let i = 0; i < n; i++) {
        const instability = prefixMax[i] - suffixMin[i];

        if (instability <= k) {
            return i;
        }
    }

    return -1;
};