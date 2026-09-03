/**
 * @param {number[]} nums1
 * @return {boolean}
 */
var uniformArray = function(nums1) {
    
    let min = Math.min(...nums1);

    if (min % 2 === 1) {
        return true;
    }

    for (let num of nums1) {
        if (num % 2 === 1) {
            return false;
        }
    }

    return true;
};