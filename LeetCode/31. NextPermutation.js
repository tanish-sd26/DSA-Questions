var nextPermutation = function(nums) {
    let n = nums.length;

    // Find the first decreasing element from right
    let i = n - 2;

    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--;
    }

    // If such element exists, find the next larger element
    if (i >= 0) {
        let j = n - 1;

        while (nums[j] <= nums[i]) {
            j--;
        }

        // Swap
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    // Reverse the remaining part
    let left = i + 1;
    let right = n - 1;

    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]];
        left++;
        right--;
    }
};