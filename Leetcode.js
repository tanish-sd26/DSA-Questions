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