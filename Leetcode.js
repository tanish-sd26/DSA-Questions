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