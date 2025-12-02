import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8').trim().split('\n');

const sample = `
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
`.trim().split('\n');

function part1(instructions: string[]) {
	let position = 50;
	let zeros = 0;

	for (const instruction of instructions) {
		const direction = instruction[0];
		let count = Number.parseInt(instruction.slice(1), 10);

		if (direction === 'R') {
			position += count;
			while (position > 99) position -= 100;
		} else {
			position -= count;
			while (position < 0) position += 100;
		}

		if (position === 0) zeros++;
	}

	console.log(zeros);
}

function part2(instructions: string[]) {
	let position = 50;
	let zeros = 0;
	
	for (const instruction of instructions) {
		const direction = instruction[0];
		let count = Number.parseInt(instruction.slice(1), 10);

		while (count > 0) {
			if (direction === 'R') {
				position = position === 99 ? 0 : position + 1;
			} else {
				position = position === 0 ? 99 : position - 1;
			}
			count--;
			if (position === 0) zeros++;
		}
	}
	
	console.log(zeros);
}

part1(input);
part2(input);