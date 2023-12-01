import fs from 'node:fs';

const input = fs.readFileSync('input', 'utf-8');

let t = 0;

function f (line) {
    let i = 0, j = line.length - 1;
    let _i = false, _j = false;
    while (!_i || !_j) {
        if (isNaN(line[i])) i++;
        else _i = true;
        if (isNaN(line[j])) j--;
        else _j = true;
    }
    return parseInt(line[i] + line[j])
}

for (const line of input.split('\n')) {
    t += f(line);
}

console.log(t);