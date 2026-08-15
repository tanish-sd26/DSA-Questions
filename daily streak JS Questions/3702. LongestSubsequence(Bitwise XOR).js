var longestSubsequence = function(nums) {
    let xor = 0;

    for (const num of nums) {
        xor ^= num;
    }

    if (xor !== 0) {
        return nums.length;
    }

    for (const num of nums) {
        if (num !== 0) {
            return nums.length - 1;
        }
    }

    return 0;
};