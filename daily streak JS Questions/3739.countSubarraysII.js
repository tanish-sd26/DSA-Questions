/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countMajoritySubarrays = function(nums, target) {
    const n = nums.length;

    const pref = [0];
    let sum = 0;

    for (const x of nums) {
        sum += (x === target ? 1 : -1);
        pref.push(sum);
    }

    // Coordinate compression
    const vals = [...pref].sort((a, b) => a - b);
    const unique = [];

    for (const v of vals) {
        if (unique.length === 0 || unique[unique.length - 1] !== v)
            unique.push(v);
    }

    const index = new Map();
    for (let i = 0; i < unique.length; i++) {
        index.set(unique[i], i + 1);
    }

    class BIT {
        constructor(n) {
            this.bit = new Array(n + 2).fill(0);
        }

        add(i, val) {
            while (i < this.bit.length) {
                this.bit[i] += val;
                i += i & -i;
            }
        }

        query(i) {
            let res = 0;
            while (i > 0) {
                res += this.bit[i];
                i -= i & -i;
            }
            return res;
        }
    }

    const bit = new BIT(unique.length);
    let ans = 0;

    for (const p of pref) {
        const idx = index.get(p);
        ans += bit.query(idx - 1);
        bit.add(idx, 1);
    }

    return ans;
};