import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8');

const sample = `
..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

function part1(input: string) {
	const grid = input.trim().split('\n').map(row => row.split(''));
	let accessible = [];
	let rows = grid.length - 1;
	for (let r = 0; r <= rows; r++) {
		let cols = grid[r].length - 1;
		for (let c = 0; c <= cols; c++) {
			if (grid[r][c] === '.') continue;
			let neighbors = 0;
			// UP
			if (r > 0 && grid[r-1][c] === '@') neighbors++;
			// UP-RIGHT
			if (r > 0 && c < cols && grid[r-1][c+1] === '@') neighbors++;
			// RIGHT
			if (c < cols && grid[r][c+1] === '@') neighbors++;
			// DOWN-RIGHT
			if (r < rows && c < cols && grid[r+1][c+1] === '@') neighbors++;
			// DOWN
			if (r < rows && grid[r+1][c] === '@') neighbors++;
			// DOWN-LEFT
			if (r < rows && c > 0 && grid[r+1][c-1] === '@') neighbors++;
			// LEFT
			if (c > 0 && grid[r][c-1] === '@') neighbors++;
			// UP-LEFT
			if (r > 0 && c > 0 && grid[r-1][c-1] === '@') neighbors++;

			if (neighbors < 4) accessible.push([r,c]);
		}
	}
	console.log(accessible.length);
}

part1(sample);
part1(input);

function part2(input: string) {
	const grid = input.trim().split('\n').map(row => row.split(''));
	let prevRemovedLength = 0;
	let removed = [];
	let rows = grid.length - 1;
	do {
		prevRemovedLength = removed.length;
		for (let r = 0; r <= rows; r++) {
			let cols = grid[r].length - 1;
			for (let c = 0; c <= cols; c++) {
				if (grid[r][c] === '.') continue;
				let neighbors = 0;
				// UP
				if (r > 0 && grid[r-1][c] === '@') neighbors++;
				// UP-RIGHT
				if (r > 0 && c < cols && grid[r-1][c+1] === '@') neighbors++;
				// RIGHT
				if (c < cols && grid[r][c+1] === '@') neighbors++;
				// DOWN-RIGHT
				if (r < rows && c < cols && grid[r+1][c+1] === '@') neighbors++;
				// DOWN
				if (r < rows && grid[r+1][c] === '@') neighbors++;
				// DOWN-LEFT
				if (r < rows && c > 0 && grid[r+1][c-1] === '@') neighbors++;
				// LEFT
				if (c > 0 && grid[r][c-1] === '@') neighbors++;
				// UP-LEFT
				if (r > 0 && c > 0 && grid[r-1][c-1] === '@') neighbors++;
	
				if (neighbors < 4) {
					removed.push([r,c]);
					grid[r][c] = '.';
				}
			}
		}
	} while (removed.length !== prevRemovedLength);

	console.log(removed.length);
}

part2(sample);
part2(input);