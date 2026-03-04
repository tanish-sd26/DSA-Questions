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