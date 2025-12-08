import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8');

const sample = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

function part1(input: string) {
	const lines = input.split('\n').map(row => row.split(''));
	let beamIndexes = [lines[0].indexOf('S')];
	let splits = 0;
	for (let i = 1; i < lines.length; i++) {
		let nextBeamIndexes = [];
		for (const beamIndex of beamIndexes) {
			if (lines[i][beamIndex] === '.') {
				lines[i][beamIndex] = '|'
				nextBeamIndexes.push(beamIndex);
			} else if (lines[i][beamIndex] === '^') {
				splits++;
				lines[i][beamIndex - 1] = '|';
				nextBeamIndexes.push(beamIndex - 1);
				lines[i][beamIndex + 1] = '|';
				nextBeamIndexes.push(beamIndex + 1);
			}
		}
		beamIndexes = nextBeamIndexes;
	}
	console.log(splits);
	// console.log(lines.map(row => row.join('')).join('\n'));
}

part1(sample);
part1(input);

function part2(input: string) {
	const lines = input.split('\n');

	const memo = new Map();

	const walk = (r: number, c: number): number => {
		const memoized = memo.get(`${r},${c}`);
		if (memoized) return memoized;

		for (let i = r + 1; i < lines.length; i++) {
			if (lines[i][c] === '^') {
				const result = 1 + walk(i, c - 1) + walk(i, c + 1);
				memo.set(`${r},${c}`, result);
				return result;
			}
		}

		return 0;
	}

	console.log(1 + walk(0, lines[0].indexOf('S')));
}

part2(sample);
part2(input);