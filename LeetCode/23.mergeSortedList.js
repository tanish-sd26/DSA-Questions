/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 **/

var mergeKLists = function(lists) {

    class MinHeap {
        constructor() {
            this.heap = [];
        }

        size() {
            return this.heap.length;
        }

        push(node) {
            this.heap.push(node);
            this.bubbleUp(this.heap.length - 1);
        }

        bubbleUp(index) {
            while (index > 0) {

                let parent =
                    Math.floor((index - 1) / 2);

                if (
                    this.heap[parent].val <=
                    this.heap[index].val
                ) {
                    break;
                }

                [
                    this.heap[parent],
                    this.heap[index]
                ] =
                [
                    this.heap[index],
                    this.heap[parent]
                ];

                index = parent;
            }
        }

        pop() {

            if (this.heap.length === 1) {
                return this.heap.pop();
            }

            const min = this.heap[0];

            this.heap[0] =
                this.heap.pop();

            this.bubbleDown(0);

            return min;
        }

        bubbleDown(index) {

            const n = this.heap.length;

            while (true) {

                let smallest = index;

                let left =
                    index * 2 + 1;

                let right =
                    index * 2 + 2;

                if (
                    left < n &&
                    this.heap[left].val <
                    this.heap[smallest].val
                ) {
                    smallest = left;
                }

                if (
                    right < n &&
                    this.heap[right].val <
                    this.heap[smallest].val
                ) {
                    smallest = right;
                }

                if (
                    smallest === index
                ) {
                    break;
                }

                [
                    this.heap[index],
                    this.heap[smallest]
                ] =
                [
                    this.heap[smallest],
                    this.heap[index]
                ];

                index = smallest;
            }
        }
    }

    const heap = new MinHeap();

    for (const node of lists) {
        if (node) {
            heap.push(node);
        }
    }

    const dummy = new ListNode(0);
    let curr = dummy;

    while (heap.size()) {

        const node = heap.pop();

        curr.next = node;
        curr = curr.next;

        if (node.next) {
            heap.push(node.next);
        }
    }

    return dummy.next;
};