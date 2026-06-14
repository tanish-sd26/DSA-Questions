/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.next = (next === undefined ? null : next)
 * }
 */

/**
 * @param {ListNode} head
 * @return {number}
 */
var pairSum = function(head) {

    const values = [];

    let curr = head;

    while (curr) {
        values.push(curr.val);
        curr = curr.next;
    }

    let maxSum = 0;
    const n = values.length;

    for (let i = 0; i < n / 2; i++) {

        const twinSum =
            values[i] +
            values[n - 1 - i];

        maxSum = Math.max(maxSum, twinSum);
    }

    return maxSum;
};