/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxTotalValue = function(nums, k) {

    let minVal = Infinity;
    let maxVal = -Infinity;

    for (const num of nums) {
        minVal = Math.min(minVal, num);
        maxVal = Math.max(maxVal, num);
    }

    return (maxVal - minVal) * k;
};