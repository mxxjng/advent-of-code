const input = document.getElementsByTagName("pre")[0].innerText.split("\n");
let totalsums = [];

function solve(input) {
    let paths = [];
    let currentPath = -1;
    let test = {};

    for (const i of input) {
        const commands = i.replace("\r", "").split(" ");

        // cd
        if (commands[1] === "cd") {
            // navigate back
            if (commands[2] === "..") {
                if (paths.length > 0) {
                    paths.pop();
                    currentPath--;
                }
                continue;
            }

            if (currentPath === -1) {
                test = {
                    name: commands[2],
                    children: [],
                    type: "dir",
                };
            }

            paths.push(commands[2]);
            currentPath++;
        }

        if (commands[0] === "dir") {
            // get parent object
            let parent = findNestedDirectories(
                test,
                "name",
                paths[currentPath]
            );

            // add listed dir to parent
            parent["children"].push({
                name: commands[1],
                children: [],
                type: "dir",
            });
        }

        if (!isNaN(parseInt(commands[0]))) {
            // get the parent object
            let parent = findNestedDirectories(
                test,
                "name",
                paths[currentPath]
            );

            // add the listed file intro the parent
            parent["children"].push({
                name: `${commands[1]}.file`, // cause some files are named the same like directories
                type: "file",
                size: parseInt(commands[0]),
            });
        }
    }
    console.log("filetree:");
    console.log(test);

    const p = calculcateFileSize(test);
    console.log(p);
}

function calculcateFileSize(obj) {
    let sum = obj.children
        .filter((f) => f.type === "file")
        .reduce((acc, val) => {
            return acc + val.size;
        }, 0);

    obj.totalSize = sum;

    if (sum <= 100000) {
        totalsums.push(sum);
    }

    for (const i of obj.children) {
        if (i.type === "dir") {
            calculcateFileSize(i);
        }
    }

    return obj;
}

// find a nested object by value recursive
function findNestedDirectories(obj, key, value) {
    // Base case
    if (obj[key] === value) {
        return obj;
    } else {
        var keys = Object.keys(obj); // add this line to iterate over the keys

        for (var i = 0, len = keys.length; i < len; i++) {
            var k = keys[i]; // use this key for iteration, instead of index "i"

            // add "obj[k] &&" to ignore null values
            if (obj[k] && typeof obj[k] == "object") {
                var found = findNestedDirectories(obj[k], key, value);
                if (found) {
                    // If the object was found in the recursive call, bubble it up.
                    return found;
                }
            }
        }
    }
}

solve(input);

console.log(totalsums);
console.log(totalsums.reduce((acc, val) => acc + val, 0));
