var largestInteger = function(nums, k) {
    const count = new Map();

    for (let i = 0; i <= nums.length - k; i++) {
        const window = new Set();

        for (let j = i; j < i + k; j++) {
            window.add(nums[j]);
        }

        for (const num of window) {
            count.set(num, (count.get(num) || 0) + 1);
        }
    }

    let answer = -1;

    for (const [num, freq] of count) {
        if (freq === 1) {
            answer = Math.max(answer, num);
        }
    }

    return answer;
};