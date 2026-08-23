var sumGame = function(num) {
    const n = num.length;
    const half = n / 2;

    let leftSum = 0;
    let rightSum = 0;
    let leftQ = 0;
    let rightQ = 0;

    for (let i = 0; i < half; i++) {
        if (num[i] === "?") {
            leftQ++;
        } else {
            leftSum += Number(num[i]);
        }
    }

    for (let i = half; i < n; i++) {
        if (num[i] === "?") {
            rightQ++;
        } else {
            rightSum += Number(num[i]);
        }
    }

    const diff = leftSum - rightSum;
    const qDiff = leftQ - rightQ;

    if (qDiff === 0) {
        return diff !== 0;
    }

    return diff * 2 !== -qDiff * 9;
};