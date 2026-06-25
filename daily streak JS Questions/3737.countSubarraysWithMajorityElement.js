/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function(nums, target) {
    const n = nums.length;

    const pref = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        pref[i + 1] = pref[i] + (nums[i] === target ? 1 : -1);
    }

    let ans = 0;

    for (let l = 0; l < n; l++) {
        for (let r = l; r < n; r++) {
            const sum = pref[r + 1] - pref[l];

            if (sum > 0) ans++;
        }
    }

    return ans;
};