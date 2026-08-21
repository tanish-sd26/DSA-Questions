var divide = function(dividend, divisor) {
    const MIN = -(2n ** 31n);
    const MAX = (2n ** 31n) - 1n;

    let a = BigInt(dividend);
    let b = BigInt(divisor);

    const negative = (a < 0n) !== (b < 0n);

    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;

    let quotient = 0n;

    while (a >= b) {
        let value = b;
        let count = 1n;

        while (a >= value + value) {
            value += value;
            count += count;
        }

        a -= value;
        quotient += count;
    }

    if (negative) {
        quotient = -quotient;
    }

    if (quotient > MAX) return Number(MAX);
    if (quotient < MIN) return Number(MIN);

    return Number(quotient);
};