var minimumDeletions = function(nums) {
    const n = nums.length;

    let minIndex = 0;
    let maxIndex = 0;

    // Find indices of minimum and maximum
    for (let i = 1; i < n; i++) {
        if (nums[i] < nums[minIndex]) {
            minIndex = i;
        }

        if (nums[i] > nums[maxIndex]) {
            maxIndex = i;
        }
    }

    // Put min and max in left-to-right order
    const left = Math.min(minIndex, maxIndex);
    const right = Math.max(minIndex, maxIndex);

    // Three possible ways
    const removeFromFront = right + 1;
    const removeFromBack = n - left;
    const removeBothEnds = (left + 1) + (n - right);

    return Math.min(
        removeFromFront,
        removeFromBack,
        removeBothEnds
    );
};