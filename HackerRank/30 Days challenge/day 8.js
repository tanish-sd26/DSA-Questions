    function processData(input) {
    const lines = input.trim().split('\n');
    
    const n = parseInt(lines[0]);
    const phoneBook = {};

    // Store entries
    for (let i = 1; i <= n; i++) {
        const [name, number] = lines[i].split(' ');
        phoneBook[name] = number;
    }

    // Process queries
    for (let i = n + 1; i < lines.length; i++) {
        const query = lines[i].trim();

        if (phoneBook[query]) {
            console.log(`${query}=${phoneBook[query]}`);
        } else {
            console.log("Not found");
        }
    }
}

