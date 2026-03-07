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