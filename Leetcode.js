// 2679. Function Composition
function compose(functions) {
    return function(x) {
        let result = x;

        for (let i = functions.length - 1; i >= 0; i--) {
            result = functions[i](result);
        }

        return result;
    };
}

//function argumentsLength that returns the count of arguments
function argumentsLength(...args) {
    return args.length;
}

//Allow one function call
function once(fn) {
    let called = false;

    return function(...args) {
        if (called) {
            return undefined;
        }

        called = true;
        return fn(...args);
    };
}

//function fn, return a memoized version of that function
function memoize(fn) {
    const cache = {};

    return function(...args) {
        const key = args.join(",");

        if (key in cache) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;

        return result;
    };
}
//2723. Add two promises
var addTwoPromises = async function(promise1, promise2) {
    const [value1, value2] = await Promise.all([promise1, promise2]);
    return value1 + value2;
};

// 2621. sleep. Returns a promise that resolves after the specified milliseconds
function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

// 2715. Cancellable. Schedules fn to run after t ms and returns a cancel function that clears the timer
function cancellable(fn, args, t) {
    const timerId = setTimeout(() => fn(...args), t);

    return function cancelFn() {
        clearTimeout(timerId);
    };
}
//2725. Interval cancellation. Schedules fn to run every t ms and returns a cancel function that clears the interval
var cancellable = function(fn, args, t) {

    fn(...args); // Immediately execute the function with the provided arguments

    const intervalId = setInterval(() => {
        fn(...args); // Execute the function again every t milliseconds
    }, t);

    return function cancelFn() {
        clearInterval(intervalId); // Stop the repeated execution of the function
    };
};

//2637. promise time limit. 
var timeLimit = function(fn, t) {

    // Return a new async function that wraps the original function
    return async function(...args) {

        // Create a promise that rejects after t milliseconds
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject("Time Limit Exceeded"), t);
        });

        // Call the original async function with the provided arguments
        const fnPromise = fn(...args);

        // Return whichever promise finishes first (function result or timeout)
        return Promise.race([fnPromise, timeoutPromise]);
    };

};
//2622. Time Limited Cache
// Create a class for Time Limited Cache
var TimeLimitedCache = function() {

    // Initialize a Map to store key -> {value, timeoutId}
    this.cache = new Map();

};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration
 * @return {boolean}
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {

    // Check if key already exists and is not expired
    const exists = this.cache.has(key);

    // If key exists clear the previous timeout
    if (exists) {
        clearTimeout(this.cache.get(key).timeoutId);
    }

    // Create a timeout that deletes the key after duration
    const timeoutId = setTimeout(() => {
        this.cache.delete(key);
    }, duration);

    // Store value and timeoutId in the map
    this.cache.set(key, { value, timeoutId });

    // Return true if key existed before and was unexpired
    return exists;
};

/** 
 * @param {number} key
 * @return {number}
 */
TimeLimitedCache.prototype.get = function(key) {

    // If key does not exist return -1
    if (!this.cache.has(key)) {
        return -1;
    }

    // Return the stored value
    return this.cache.get(key).value;
};

/**
 * @return {number}
 */
TimeLimitedCache.prototype.count = function() {

    // Return number of unexpired keys
    return this.cache.size;

};

//2627. Debounce
// Return a debounced version of function fn that delays execution by t ms and cancels previous calls within that window
var debounce = function(fn, t) {

    // Store the timeout id to track scheduled execution
    let timer = null;

    // Return a new function that will be the debounced version
    return function(...args) {

        // Clear the previous scheduled execution if function is called again
        clearTimeout(timer);

        // Schedule the function to run after t milliseconds
        timer = setTimeout(() => {

            // Execute the original function with the latest arguments
            fn(...args);

        }, t);
    };

};

//2721. Run all async functions in parallel and resolve with results in order, or reject immediately on first failure
var promiseAll = function(functions) {

    return new Promise((resolve, reject) => {

        const results = new Array(functions.length);
        let completed = 0;

        functions.forEach((fn, index) => {

            fn()
                .then((value) => {

                    // store result at correct index to maintain order
                    results[index] = value;

                    completed++;

                    // resolve when all promises complete
                    if (completed === functions.length) {
                        resolve(results);
                    }

                })
                // reject immediately if any promise fails
                .catch(reject);

        });

    });

};

//2727.Is Object Empty. 
// Check whether the given JSON object or array has no elements or key-value pairs
var isEmpty = function(obj) {

    // If obj is an array, check its length
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }

    // If obj is an object, check number of keys
    return Object.keys(obj).length === 0;

};

//2677.Chunk Array. Split the array into smaller subarrays (chunks) of given size
var chunk = function(arr, size) {

    const result = [];

    for (let i = 0; i < arr.length; i += size) {

        // take a slice of length = size and push into result
        result.push(arr.slice(i, i + size));

    }

    return result;

};
//2619.Array prototype last. 
// Extend Array prototype to add a last() method that returns the last element or -1 if the array is empty
Array.prototype.last = function() {

    if (this.length === 0) return -1;

    return this[this.length - 1];

};

//2619. Array prototype last. // Extend Array prototype to add groupBy(fn) which groups elements based on the key returned by fn
Array.prototype.groupBy = function(fn) {

    const result = {};

    for (const item of this) {

        const key = fn(item);

        // create new group if key does not exist
        if (!result[key]) {
            result[key] = [];
        }

        // push item into the corresponding group
        result[key].push(item);

    }
    return result;
};

// Sort the array in ascending order based on the numeric value returned by fn for each element
var sortBy = function(arr, fn) {

    return arr.sort((a, b) => fn(a) - fn(b));

};

//2722. Join two arrays of objects by id, merge objects with same id (arr2 overrides arr1), and return result sorted by id
var join = function(arr1, arr2) {

    const map = new Map();

    // store all objects from arr1 using id as key
    for (const obj of arr1) {
        map.set(obj.id, obj);
    }

    // merge objects from arr2
    for (const obj of arr2) {

        if (map.has(obj.id)) {
            // merge objects, arr2 values override arr1
            map.set(obj.id, { ...map.get(obj.id), ...obj });
        } else {
            map.set(obj.id, obj);
        }

    }

    // convert map values to array and sort by id
    return Array.from(map.values()).sort((a, b) => a.id - b.id);

};

//2625.Nested Array Flattening. Flatten a nested array up to depth n
var flat = function(arr, n) {
    let res = [];

    // helper function to recursively flatten till depth n
    function dfs(array, depth) {
        for (let el of array) {
            if (Array.isArray(el) && depth < n) {
                dfs(el, depth + 1); // go deeper if depth allowed
            } else {
                res.push(el); // otherwise push element as it is
            }
        }
    }

    dfs(arr, 0);
    return res;
};

//compact object 
// Recursively remove all keys with falsy values from objects and arrays
var compactObject = function(obj) {

    if (!obj) return false;                 // remove falsy values
    if (typeof obj !== "object") return obj; // primitive truthy value

    if (Array.isArray(obj)) {
        const res = [];
        for (let val of obj) {
            const compacted = compactObject(val);
            if (compacted) res.push(compacted);
        }
        return res;
    }

    const res = {};
    for (let key in obj) {
        const compacted = compactObject(obj[key]);
        if (compacted) res[key] = compacted;
    }

    return res;
};

//Event Emitter 
// EventEmitter implementation
class EventEmitter {

    constructor() {
        this.events = {}; // eventName -> callbacks
    }

    subscribe(eventName, callback) {

        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }

        this.events[eventName].push(callback);

        return {
            unsubscribe: () => {

                const idx = this.events[eventName].indexOf(callback);

                if (idx !== -1) {
                    this.events[eventName].splice(idx, 1);
                }

            }
        };
    }

    emit(eventName, args = []) {

        if (!this.events[eventName]) return [];

        const res = [];

        for (const cb of this.events[eventName]) {
            res.push(cb(...args));
        }

        return res;
    }
}

//Array wrapper 
//ArrayWrapper: supports + addition & String() formatting
class ArrayWrapper {

    constructor(nums) {
        this.nums = nums;
    }

    // JS tries valueOf() when objects are used with + operator
    valueOf() {
        return this.nums.reduce((sum, n) => sum + n, 0);
    }

    // String(obj) calls toString()
    toString() {
        return `[${this.nums.join(',')}]`;
    }
}

//Calculator with method chaining

class Calculator {

    constructor(value) {
        this.result = value;
    }

    add(value) {
        this.result += value;
        return this;
    }

    subtract(value) {
        this.result -= value;
        return this;
    }

    multiply(value) {
        this.result *= value;
        return this;
    }

    divide(value) {

        if (value === 0) {
            throw new Error("Division by zero is not allowed");
        }

        this.result /= value;
        return this;
    }

    power(value) {
        this.result = this.result ** value;
        return this;
    }

    getResult() {
        return this.result;
    }
}

//2618. Check if objectinstance of class.
// Create a counter that returns increasing values starting from n
var createCounter = function(n) {

    return function() {
        return n++;
    };

};

// Check if obj has access to classFunction methods through prototype chain
var checkIfInstanceOf = function(obj, classFunction) {

    if (obj === null || obj === undefined || typeof classFunction !== "function") {
        return false;
    }

    let proto = Object.getPrototypeOf(obj);

    while (proto !== null) {

        if (proto === classFunction.prototype) {
            return true;
        }

        proto = Object.getPrototypeOf(proto);
    }

    return false;
};

//2624. snail traversal 
// Add snail method to Array prototype
Array.prototype.snail = function(rowsCount, colsCount) {

    if (rowsCount * colsCount !== this.length) return [];

    const res = Array.from({ length: rowsCount }, () => Array(colsCount));
    let index = 0;

    for (let col = 0; col < colsCount; col++) {

        if (col % 2 === 0) {

            for (let row = 0; row < rowsCount; row++) {
                res[row][col] = this[index++];
            }

        } else {

            for (let row = rowsCount - 1; row >= 0; row--) {
                res[row][col] = this[index++];
            }

        }
    }

    return res;
};

//memoize II
// Memoize function using argument reference based caching
var memoize = function(fn) {

    const cache = new Map();

    return function(...args) {

        let curr = cache;

        for (let i = 0; i < args.length; i++) {

            const arg = args[i];

            if (!curr.has(arg)) {
                curr.set(arg, new Map());
            }

            curr = curr.get(arg);
        }

        if (curr.has("result")) {
            return curr.get("result");
        }

        const result = fn(...args);
        curr.set("result", result);

        return result;
    };
};

//2648. Fibonacci sequence.
// Generator that yields Fibonacci numbers indefinitely
var fibGenerator = function* () {

    let a = 0, b = 1;

    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }

};

//2649. Nested Array Generator.
// Generator for inorder traversal of nested arrays
var inorderTraversal = function* (arr) {

    for (const item of arr) {

        if (Array.isArray(item)) {
            yield* inorderTraversal(item);
        } 
        else {
            yield item;
        }

    }

};

// Run generator with cancellation support
var cancellable = function(generator) {

    let cancel;

    const promise = new Promise((resolve, reject) => {

        cancel = () => step("throw", "Cancelled");

        function step(type, value) {

            let result;

            try {
                result = generator[type](value);
            } catch (err) {
                reject(err);
                return;
            }

            const { value: yielded, done } = result;

            if (done) {
                resolve(yielded);
                return;
            }

            Promise.resolve(yielded)
                .then(v => step("next", v))
                .catch(e => step("throw", e));
        }

        step("next");
    });

    return [cancel, promise];
};

// Add callPolyfill to all functions
Function.prototype.callPolyfill = function(obj, ...args) {

    const fnSymbol = Symbol(); // unique property

    obj[fnSymbol] = this; // attach function to object

    const result = obj[fnSymbol](...args); // call with correct this

    delete obj[fnSymbol]; // cleanup

    return result;
};

// Find two indices whose values sum to target
var twoSum = function(nums, target) {

    const map = new Map(); // value -> index

    for (let i = 0; i < nums.length; i++) {

        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }
};

//3600
// Binary search stability + DSU to check if spanning tree possible with ≤k upgrades
var maxStability = function(n, edges, k) {

    class DSU {
        constructor(n){
            this.parent = Array(n).fill(0).map((_,i)=>i);
            this.rank = Array(n).fill(0);
        }
        find(x){
            if(this.parent[x]!==x) this.parent[x]=this.find(this.parent[x]);
            return this.parent[x];
        }
        union(a,b){
            let pa=this.find(a), pb=this.find(b);
            if(pa===pb) return false;
            if(this.rank[pa]<this.rank[pb]) [pa,pb]=[pb,pa];
            this.parent[pb]=pa;
            if(this.rank[pa]===this.rank[pb]) this.rank[pa]++;
            return true;
        }
    }

    function can(stability){

        const dsu = new DSU(n);
        let upgrades = 0;
        let used = 0;

        for(const [u,v,s,must] of edges){
            if(must){
                if(s < stability) return false;
                if(!dsu.union(u,v)) return false;
                used++;
            }
        }

        const optional = [];

        for(const [u,v,s,must] of edges){
            if(!must) optional.push([u,v,s]);
        }

        optional.sort((a,b)=>b[2]-a[2]);

        for(const [u,v,s] of optional){

            if(used===n-1) break;
            if(dsu.find(u)===dsu.find(v)) continue;

            if(s>=stability){
                dsu.union(u,v);
                used++;
            }
            else if(2*s>=stability && upgrades<k){
                upgrades++;
                dsu.union(u,v);
                used++;
            }
        }

        return used===n-1;
    }

    let left = 0, right = 2e5, ans = -1;

    while(left<=right){
        const mid = Math.floor((left+right)/2);

        if(can(mid)){
            ans = mid;
            left = mid+1;
        }else{
            right = mid-1;
        }
    }

    return ans;
};

var getBiggestThree = function(grid) {
    
    const m = grid.length;
    const n = grid[0].length;
    const set = new Set();

    function getSum(r, c, size) {

        let sum = 0;

        let i = r - size, j = c; // start from top

        // ↘
        for (let k = 0; k < size; k++) {
            sum += grid[i++][j++];
        }

        // ↙
        for (let k = 0; k < size; k++) {
            sum += grid[i++][j--];
        }

        // ↖
        for (let k = 0; k < size; k++) {
            sum += grid[i--][j--];
        }

        // ↗
        for (let k = 0; k < size; k++) {
            sum += grid[i--][j++];
        }

        return sum;
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            // single cell
            set.add(grid[i][j]);

            // rhombus
            for (let size = 1;
                 i - size >= 0 && i + size < m && j - size >= 0 && j + size < n;
                 size++) {

                set.add(getSum(i, j, size));
            }
        }
    }

    return Array.from(set).sort((a,b)=>b-a).slice(0,3);
};


// Binary Search to find minimum time required
var minNumberOfSeconds = function(mountainHeight, workerTimes) {
    
    // Function to check if given time is enough
    function canFinish(time) {
        let totalHeight = 0;
        
        for (let t of workerTimes) {
            
            // Solve t * x*(x+1)/2 <= time
            // => x*(x+1) <= (2*time)/t
            let k = Math.floor((2 * time) / t);
            
            // Solve x using quadratic formula
            let x = Math.floor((Math.sqrt(1 + 4 * k) - 1) / 2);
            
            totalHeight += x;
            
            // Early stop if already enough
            if (totalHeight >= mountainHeight) return true;
        }
        
        return false;
    }
    
    // Binary search range
    let left = 0;
    let right = 1e15; // large enough upper bound
    let ans = right;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (canFinish(mid)) {
            ans = mid;
            right = mid - 1; // try smaller time
        } else {
            left = mid + 1; // need more time
        }
    }
    
    return ans;
};

//2. Add two numbers
// Add two numbers represented as linked lists
var addTwoNumbers = function(l1, l2) {
    
    // Dummy node to simplify result handling
    let dummy = new ListNode(0);
    let current = dummy;
    
    let carry = 0; // store carry
    
    // Traverse both lists until both end
    while (l1 !== null || l2 !== null || carry !== 0) {
        
        // Get values (if node exists, else 0)
        let val1 = l1 ? l1.val : 0;
        let val2 = l2 ? l2.val : 0;
        
        // Calculate sum
        let sum = val1 + val2 + carry;
        
        // Update carry
        carry = Math.floor(sum / 10);
        
        // Create new node with digit
        current.next = new ListNode(sum % 10);
        
        // Move pointer
        current = current.next;
        
        // Move l1 and l2 if possible
        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    
    // Return result (skip dummy node)
    return dummy.next;
};

//3. Longest Substring Without Repeating Characters
// Sliding window to find longest substring without repeating characters
var lengthOfLongestSubstring = function(s) {
    
    let set = new Set();
    let left = 0;
    let maxLen = 0;
    
    for (let right = 0; right < s.length; right++) {
        
        // Remove chars until duplicate gone
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        
        set.add(s[right]);
        
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};

//4. medium of two sorted arrays 
// Binary search on smaller array to find correct partition
var findMedianSortedArrays = function(nums1, nums2) {
    
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }
    
    let m = nums1.length;
    let n = nums2.length;
    
    let left = 0, right = m;
    
    while (left <= right) {
        
        let cut1 = Math.floor((left + right) / 2);
        let cut2 = Math.floor((m + n + 1) / 2) - cut1;
        
        let l1 = cut1 === 0 ? -Infinity : nums1[cut1 - 1];
        let l2 = cut2 === 0 ? -Infinity : nums2[cut2 - 1];
        let r1 = cut1 === m ? Infinity : nums1[cut1];
        let r2 = cut2 === n ? Infinity : nums2[cut2];
        
        if (l1 <= r2 && l2 <= r1) {
            
            // correct partition found
            if ((m + n) % 2 === 0) {
                return (Math.max(l1, l2) + Math.min(r1, r2)) / 2;
            } else {
                return Math.max(l1, l2);
            }
        }
        else if (l1 > r2) {
            right = cut1 - 1;
        }
        else {
            left = cut1 + 1;
        }
    }
};

//5. Longest Palindromic Substring
// Expand around center to find longest palindrome
var longestPalindrome = function(s) {
    
    let start = 0, end = 0;
    
    function expand(l, r) {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            l--;
            r++;
        }
        return r - l - 1; // length
    }
    
    for (let i = 0; i < s.length; i++) {
        
        let len1 = expand(i, i);     // odd
        let len2 = expand(i, i + 1); // even
        
        let maxLen = Math.max(len1, len2);
        
        if (maxLen > end - start) {
            start = i - Math.floor((maxLen - 1) / 2);
            end = i + Math.floor(maxLen / 2);
        }
    }
    
    return s.substring(start, end + 1);
};

//6. ZigZag Conversion
// Simulate zigzag traversal using row-wise storage
var convert = function(s, numRows) {
    
    if (numRows === 1 || s.length <= numRows) return s;
    
    let rows = Array.from({ length: numRows }, () => "");
    
    let currRow = 0;
    let direction = -1; // will flip
    
    for (let char of s) {
        
        rows[currRow] += char;
        
        // change direction at top/bottom
        if (currRow === 0 || currRow === numRows - 1) {
            direction *= -1;
        }
        
        currRow += direction;
    }
    
    return rows.join("");
};

//7. Reverse Integer
// Reverse integer with 32-bit overflow check
var reverse = function(x) {
    
    let rev = 0;
    
    while (x !== 0) {
        
        let digit = x % 10;
        x = (x / 10) | 0; // truncate toward 0
        
        // check overflow before updating rev
        if (rev > 214748364 || (rev === 214748364 && digit > 7)) return 0;
        if (rev < -214748364 || (rev === -214748364 && digit < -8)) return 0;
        
        rev = rev * 10 + digit;
    }
    
    return rev;
};

//8. String to Integer (atoi)
// Convert string to 32-bit signed integer (atoi)
var myAtoi = function(s) {
    
    let i = 0, n = s.length;
    
    // 1. skip whitespace
    while (i < n && s[i] === ' ') i++;
    
    // 2. handle sign
    let sign = 1;
    if (i < n && (s[i] === '+' || s[i] === '-')) {
        if (s[i] === '-') sign = -1;
        i++;
    }
    
    let num = 0;
    
    // 3. read digits
    while (i < n && s[i] >= '0' && s[i] <= '9') {
        
        let digit = s.charCodeAt(i) - 48;
        
        // 4. check overflow
        if (num > 214748364 || (num === 214748364 && digit > 7)) {
            return sign === 1 ? 2147483647 : -2147483648;
        }
        
        num = num * 10 + digit;
        i++;
    }
    
    return num * sign;
};

//9. Palindrome Number
// Check palindrome without converting to string
var isPalindrome = function(x) {
    
    // negative or ends with 0 (but not 0 itself)
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    
    let rev = 0;
    
    // reverse half
    while (x > rev) {
        let digit = x % 10;
        rev = rev * 10 + digit;
        x = Math.floor(x / 10);
    }
    
    // even length OR odd length
    return x === rev || x === Math.floor(rev / 10);
};

//10. Regular Expression Matching
// DP solution for regex matching with '.' and '*'
var isMatch = function(s, p) {
    
    let m = s.length, n = p.length;
    
    let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    
    dp[0][0] = true;
    
    // handle patterns like a*, a*b*, etc.
    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            
            if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
            
            else if (p[j - 1] === '*') {
                
                // ignore previous char
                dp[i][j] = dp[i][j - 2];
                
                // use it if matches
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    dp[i][j] = dp[i][j] || dp[i - 1][j];
                }
            }
        }
    }
    
    return dp[m][n];
};

//11. Container With Most Water
// Two pointer approach to find max water container
var maxArea = function(height) {
    
    let left = 0, right = height.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        
        let h = Math.min(height[left], height[right]);
        let w = right - left;
        
        maxWater = Math.max(maxWater, h * w);
        
        // move smaller height
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxWater;
};