var totalWaviness = function(num1, num2) {

    function solve(limit) {
        if (limit < 0) return 0n;

        const digits = String(limit).split('').map(Number);
        const n = digits.length;

        const memo = new Map();

        function dp(pos, tight, started, prev1, prev2) {

            const key =
                `${pos}|${tight}|${started}|${prev1}|${prev2}`;

            if (!tight && memo.has(key))
                return memo.get(key);

            if (pos === n) {
                return [1n, 0n];
            }

            let ways = 0n;
            let waviness = 0n;

            const maxDigit =
                tight ? digits[pos] : 9;

            for (let d = 0; d <= maxDigit; d++) {

                const ntight =
                    tight && (d === maxDigit);

                if (!started && d === 0) {

                    const [cnt, sum] =
                        dp(
                            pos + 1,
                            ntight,
                            false,
                            -1,
                            -1
                        );

                    ways += cnt;
                    waviness += sum;

                } else {

                    let extra = 0n;

                    if (
                        started &&
                        prev2 !== -1
                    ) {

                        const peak =
                            prev1 > prev2 &&
                            prev1 > d;

                        const valley =
                            prev1 < prev2 &&
                            prev1 < d;

                        if (peak || valley)
                            extra = 1n;
                    }

                    let nprev2;
                    let nprev1;

                    if (!started) {
                        nprev2 = -1;
                        nprev1 = d;
                    } else {
                        nprev2 = prev1;
                        nprev1 = d;
                    }

                    const [cnt, sum] =
                        dp(
                            pos + 1,
                            ntight,
                            true,
                            nprev1,
                            nprev2
                        );

                    ways += cnt;
                    waviness +=
                        sum +
                        extra * cnt;
                }
            }

            const result =
                [ways, waviness];

            if (!tight)
                memo.set(key, result);

            return result;
        }

        return dp(
            0,
            true,
            false,
            -1,
            -1
        )[1];
    }

    return Number(
        solve(num2) -
        solve(num1 - 1)
    );
};