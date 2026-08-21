var findKthSmallest = function(coins, k) {
    const m = coins.length;

    function gcd(a, b) {
        while (b !== 0) {
            let t = a % b;
            a = b;
            b = t;
        }
        return a;
    }

    function lcm(a, b) {
        return a / gcd(a, b) * b;
    }


    function count(x) {
        let total = 0;

        for (let mask = 1; mask < (1 << m); mask++) {
            let L = 1;
            let bits = 0;
            let valid = true;

            for (let i = 0; i < m; i++) {
                if (mask & (1 << i)) {
                    bits++;

                    L = lcm(L, coins[i]);

                    if (L > x) {
                        valid = false;
                        break;
                    }
                }
            }

            if (!valid) continue;

            const ways = Math.floor(x / L);

            if (bits % 2 === 1) {
                total += ways;
            } else {
                total -= ways;
            }
        }

        return total;
    }

    let left = 1;
    let right = Math.min(...coins) * k;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (count(mid) >= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
};