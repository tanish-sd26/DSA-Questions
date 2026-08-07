/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function(num, t) {
    let T = BigInt(t);

    // Factorize only by 2,3,5,7
    const need = {2:0,3:0,5:0,7:0};
    for (const p of [2n,3n,5n,7n]) {
        while (T % p === 0n) {
            need[Number(p)]++;
            T /= p;
        }
    }
    if (T !== 1n) return "-1";

    const contrib = {
        1:[0,0,0,0],
        2:[1,0,0,0],
        3:[0,1,0,0],
        4:[2,0,0,0],
        5:[0,0,1,0],
        6:[1,1,0,0],
        7:[0,0,0,1],
        8:[3,0,0,0],
        9:[0,2,0,0]
    };

    function ok(rem2, rem3, rem5, rem7, slots) {
        const minDigits =
            Math.ceil(rem2 / 3) +
            Math.ceil(rem3 / 2) +
            rem5 + rem7;
        return minDigits <= slots;
    }

    function build(rem2, rem3, rem5, rem7, slots) {
        let res = "";
        for (let i = 0; i < slots; i++) {
            for (let d = 1; d <= 9; d++) {
                const c = contrib[d];
                const n2 = Math.max(0, rem2 - c[0]);
                const n3 = Math.max(0, rem3 - c[1]);
                const n5 = Math.max(0, rem5 - c[2]);
                const n7 = Math.max(0, rem7 - c[3]);

                if (ok(n2,n3,n5,n7, slots - i - 1)) {
                    res += String(d);
                    rem2 = n2; rem3 = n3;
                    rem5 = n5; rem7 = n7;
                    break;
                }
            }
        }
        return res;
    }

    const n = num.length;
    const digits = num.split("").map(Number);

    // Prefix factors
    const pref = Array(n+1).fill(null);
    pref[0] = [need[2], need[3], need[5], need[7]];

    for (let i = 0; i < n; i++) {
        const c = contrib[digits[i]] || [0,0,0,0];
        pref[i+1] = [
            Math.max(0, pref[i][0]-c[0]),
            Math.max(0, pref[i][1]-c[1]),
            Math.max(0, pref[i][2]-c[2]),
            Math.max(0, pref[i][3]-c[3])
        ];
    }

    // If already valid and zero-free
    if (!num.includes("0") && pref[n].every(x => x===0)) {
        return num;
    }

    // Try same length
    for (let i = n-1; i >= 0; i--) {
        if (digits[i] === 0) continue;

        const [r2,r3,r5,r7] = pref[i];

        for (let d = digits[i]+1; d <= 9; d++) {
            const c = contrib[d];
            const n2 = Math.max(0, r2-c[0]);
            const n3 = Math.max(0, r3-c[1]);
            const n5 = Math.max(0, r5-c[2]);
            const n7 = Math.max(0, r7-c[3]);

            const suffix = n-i-1;

            if (ok(n2,n3,n5,n7,suffix)) {
                return num.slice(0,i) + d +
                    build(n2,n3,n5,n7,suffix);
            }
        }
    }

    // Need longer length
    let len = n+1;
    while (true) {
        if (ok(need[2],need[3],need[5],need[7],len-1)) {
            return "1" + build(
                need[2],need[3],need[5],need[7],len-1
            );
        }
        len++;
    }
};