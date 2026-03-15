// Fancy sequence using lazy affine transformation with modular arithmetic
var Fancy = function() {
    this.MOD = 1000000007n;
    this.seq = [];
    this.mul = 1n;
    this.add = 0n;
};

Fancy.prototype.append = function(val) {
    // normalize value so current transformation doesn't affect past elements
    let inv = modInverse(this.mul, this.MOD);
    let v = (BigInt(val) - this.add + this.MOD) % this.MOD;
    v = (v * inv) % this.MOD;
    this.seq.push(v);
};

Fancy.prototype.addAll = function(inc) {
    this.add = (this.add + BigInt(inc)) % this.MOD;
};

Fancy.prototype.multAll = function(m) {
    this.mul = (this.mul * BigInt(m)) % this.MOD;
    this.add = (this.add * BigInt(m)) % this.MOD;
};

Fancy.prototype.getIndex = function(idx) {
    if (idx >= this.seq.length) return -1;
    
    // apply current global transformation
    let val = (this.seq[idx] * this.mul + this.add) % this.MOD;
    return Number(val);
};

// fast modular exponentiation
function modPow(base, exp, mod) {
    base = BigInt(base);
    exp = BigInt(exp);
    let res = 1n;

    while (exp > 0n) {
        if (exp % 2n === 1n) res = (res * base) % mod;
        base = (base * base) % mod;
        exp /= 2n;
    }

    return res;
}

// modular inverse using Fermat's little theorem
function modInverse(x, mod) {
    return modPow(x, mod - 2n, mod);
}