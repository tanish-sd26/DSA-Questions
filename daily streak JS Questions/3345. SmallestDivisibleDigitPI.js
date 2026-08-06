/**
 * @param {number} n
 * @param {number} t
 * @return {number}
 */
var smallestNumber = function(n, t) {

    const digitProduct = (num) => {
        let product = 1;

        while (num > 0) {
            product *= num % 10;
            num = Math.floor(num / 10);
        }

        return product;
    };

    let curr = n;

    while (true) {
        if (digitProduct(curr) % t === 0) {
            return curr;
        }
        curr++;
    }
};