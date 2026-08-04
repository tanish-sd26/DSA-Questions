/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function(nums) {
    const minVal = Math.min(...nums);
    const maxVal = Math.max(...nums);

    const set = new Set(nums);
    const ans = [];

    for (let x = minVal; x <= maxVal; x++) {
        if (!set.has(x)) {
            ans.push(x);
        }
    }

    return ans;
};