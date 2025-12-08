import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8');

const sample = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

function part1(input: string) {
	const inputLines = input.trim().split('\n');
	const inputRows = inputLines.slice(0, inputLines.length - 1).map(row => row.match(/\d+/g).map(Number));
	const inputOperators = inputLines[inputLines.length - 1];
	const operators: string[] = inputOperators.match(/[\*\+]/g)

	const results = inputRows[0];

	for (const row of inputRows.slice(1)) {
		for (let i = 0; i < row.length; i++) {
			results[i] = operators[i] === '*' ?
				results[i] * row[i] :
				results[i] + row[i];
		}
	}

	const result = results.reduce((p, c) => p + c, 0);
	console.log(result);
}

part1(sample);
part1(input);

function part2(input: string) {
	const inputLines = input.split('\n');
	let result = 0;
	let nums: number[] = [];
	for (let i = inputLines[inputLines.length - 1].length - 1; i >= 0; i--) {
		const operatorCharacter = inputLines[inputLines.length - 1][i]
		let num = '';
		for (let j = 0; j < inputLines.length - 1; j++) {
			num += inputLines[j][i];
		}
		if (num.trim()) {
			nums.push(parseInt(num));
		}
		if (operatorCharacter !== ' ') {
			result += operatorCharacter === '*'
				? nums.reduce((t, n) => t * n, 1)
				: nums.reduce((t, n) => t + n, 0);
			nums.length = 0;
		}
 	}

	console.log(result);
}

part2(sample);
part2(input);