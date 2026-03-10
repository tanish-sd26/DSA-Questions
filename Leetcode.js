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