var stoneGameIX = function(stones) {
    let cnt = [0, 0, 0];

    for (const stone of stones) {
        cnt[stone % 3]++;
    }

    const cnt0 = cnt[0];
    const cnt1 = cnt[1];
    const cnt2 = cnt[2];

    if (cnt0 % 2 === 0) {
        return cnt1 > 0 && cnt2 > 0;
    }

    return Math.abs(cnt1 - cnt2) > 2;
};