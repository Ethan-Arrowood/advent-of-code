const fs = require('node:fs');
const path = require('node:path');

const input = fs.readFileSync(path.join(__dirname, 'input'), { encoding: 'utf-8' });

const patterns = {
    cd: /\$ cd (\/|\.\.|\w+)/,
    ls: /\$ ls/,
    dir: /dir (\w+)/,
    file: /(\d+) (\w+)\.?(\w+)?/,
};

const parseLine = (str) => {
    const potentialMatches = Object.entries(patterns).map(([key, pattern]) => ([key, str.match(pattern)]));
    const find =potentialMatches.find(([k, v]) => v !== null);
    if (find === undefined) {
        throw new Error(`Couldn't match line: ${str}`)
    }
    const [key, match] = find;
    switch (key) {
        case 'cd': {
            return {
                lineType: 'COMMAND',
                commandType: 'CD',
                path: match[1]
            }
        }
        case 'ls': {
            return {
                lineType: 'COMMAND',
                commandType: 'LS',
            }
        }
        case 'dir': {
            return {
                lineType: 'ENTRY',
                entryType: 'DIR',
                path: match[1],
            }
        }
        case 'file': {
            return {
                lineType: 'ENTRY',
                entryType: 'FILE',
                size: parseInt(match[1]),
                name: match[2],
                fileType: match[3]
            }
        }
        default: {
            throw new Error(`Something went wrong. Key: ${key}. Match ${match}`)
        }
    }
}

const parsedLines = input.split('\n').map(line => parseLine(line))

class Node {
    constructor (type, data, parent) {
        this.type = type // 'DIR' | 'FILE'
        this.data = data // { path, size } | { name, size, fileType }
        this.parent = parent
        this.children = []
    }
}

let firstLine = parsedLines.shift();

let root

if (firstLine.lineType === 'COMMAND' && firstLine.commandType === 'CD') {
    root = new Node('DIR', { path: firstLine.path, size: 0 }, null);
} else {
    throw new Error(`First line must be a CD command. Found: ${firstLine}`);
}

const directories = [root];

function interpret (currentNode, parsedLines) {
    const line = parsedLines.shift();
    if (line === undefined) {
        return;
    }
    switch (line.lineType) {
        case 'COMMAND': {
            switch (line.commandType) {
                case 'CD': {
                    if (line.path === '..') {
                        currentNode = currentNode.parent;
                    } else {
                        currentNode = currentNode.children.find(node => node.data.path === line.path);
                    }
                    break;
                }
                case 'LS': {
                    break;
                }
            }
        }
        case 'ENTRY': {
            switch (line.entryType) {
                case 'DIR': {
                    const dir = new Node('DIR', { path: line.path, size: 0 }, currentNode);
                    currentNode.children.push(dir);
                    directories.push(dir);
                    break;
                }
                case 'FILE': {
                    let parentNode = currentNode
                    while (parentNode !== null) {
                        parentNode.data.size += line.size;
                        parentNode = parentNode.parent;
                    }
                    currentNode.children.push(new Node('FILE', { name: line.name, size: line.size, fileType: line.fileType }, currentNode))
                    break;
                }
            }
        }
    }

    interpret(currentNode, parsedLines);
}

interpret(root, parsedLines);

const sum = directories.filter(dir => dir.data.size < 100000).reduce((a, c) => a + c.data.size, 0);

console.log(`Sum of directories with a size less than 100000: ${sum}`);

const totalUnusedSpace = 70000000 - root.data.size;
const spaceNeeded = 30000000 - totalUnusedSpace;

directories.sort((a, b) => a.data.size - b.data.size);

const smallestDirectoryToDelete = directories.find(dir => dir.data.size >= spaceNeeded);
console.log(`Size of the smallest directory to delete: ${smallestDirectoryToDelete.data.size}`);