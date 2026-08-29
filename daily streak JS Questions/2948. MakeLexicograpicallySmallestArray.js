var lexicographicallySmallestArray = function(nums, limit) {
    const n = nums.length;

    // Store [value, originalIndex]
    const arr = nums.map((value, index) => [value, index]);

    // Sort by value
    arr.sort((a, b) => a[0] - b[0]);

    const result = [...nums];

    let start = 0;

    while (start < n) {
        let end = start;

        // Find one connected group
        while (
            end + 1 < n &&
            arr[end + 1][0] - arr[end][0] <= limit
        ) {
            end++;
        }

        // Original indices of this group
        const indices = [];

        for (let i = start; i <= end; i++) {
            indices.push(arr[i][1]);
        }

        // Put smallest values at smallest indices
        indices.sort((a, b) => a - b);

        for (let i = 0; i < indices.length; i++) {
            result[indices[i]] = arr[start + i][0];
        }

        start = end + 1;
    }

    return result;
};