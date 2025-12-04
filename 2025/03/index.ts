import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8');

const sample = `987654321111111
811111111111119
234234234234278
818181911112111`;

function part1(input: string) {
	const banks = input.trim().split('\n');
	let joltage = 0;

	for (const bank of banks) {
		let max = 0;
		for (const combination of combinations(bank.split(''), 2, false)) {
			const n = parseInt(combination.join(''))
			if (n > max) max = n;
		}
		joltage += max;
	}

	console.log(joltage);
}

console.log('part 1 sample (expected: 357):')
part1(sample);
console.log('part 1 input:')
part1(input);

function part2(input: string) {
	const banks = input.trim().split('\n');
	let joltage = 0;

	for (const bank of banks) {
		const joltages = bank.split('');
		let maxJoltageIndexes = new Array(12).fill('0');
		for (let i = 0; i < 12; i++) {
			let maxIndex = Math.max(maxJoltageIndexes[i-1] + 1 || 0, i);
			for (let j = maxIndex; j <= joltages.length - 12 + i; j++) {
				if (joltages[j] > joltages[maxIndex]) {
					maxIndex = j;
				}
			}
			maxJoltageIndexes[i] = maxIndex;
		}

		joltage += parseInt(maxJoltageIndexes.reduce((p, c) => p + bank[c], ''));
	}

	console.log(joltage);
}



console.log('part 2 sample (expected: 3121910778619):');
part2(sample);
console.log('part 2 input:')
part2(input);

export function* combinations<T>(
	input: T[],
	l: number,
	replacement = false,
): Generator<T[], void, undefined> {
	// Base case length 0 is always empty
	if (l === 0) {
		yield [];
		return;
	}
	// Base case length 1 is just the individual items
	if (l === 1) {
		for (const x of input) {
			yield [x];
		}
		return;
	}
	// Without replacement base case length greater than length of input return
	// nothing (not possible).
	// With replacement, the result can exceed the input length so ignore and
	// continue. This will fall through until `input.length` is `1` and the
	// identity list is returned.
	if (!replacement && input.length < l) return;

	// Without replacement:
	// The iteration limit here comes from the fact that as we iterate through
	// the elements of `input` and we are at position `i` and we need `l` total
	// elements, then we need at least `l - 1` more elements after position `i`.
	// Otherwise, `input.length - i - 1 >= l - 1` -> `i <= input.length - l`.
	// We can also work this out with an example.
	// Given an input of `[1, 2, 3, 4]` and `l = 3` as `i=0` then current
	// `input[i] = 1` and remaining `input.slice(i + 1) = [2,3,4]` there are 3
	// elements; enough to create combinations of `l = 3`. Next, `i=1`, now
	// current `input[i] = 2` and remaining `input.slice(i+1) = [3,4]` there
	// are 2 elements; enough to create combinations of `l = 3` still. If we
	// continued iterating to `i=2`, then current would be `input[i] = 3`, and
	// remaining `input.slice(i+1) = [4]`. There is only 1 element; not enough
	// to create combinations of `l = 3`.
	// With replacement:
	// We need to iterate all the way through to the end of the input list so
	// that it can combine with itself.
	for (
		let i = 0;
		i <= (replacement ? input.length - 1 : input.length - l);
		i++
	) {
		// The recursion here involves passing the list of remaining values to
		// select from. With replacement we always want to include the current
		// number, and without replacement we want to exclude it. Thus we can
		// simply shift the slice index by 1 based on the `replacement` boolean
		for (const combination of combinations(
			input.slice(i + Number(!replacement)),
			l - 1,
			replacement,
		)) {
			yield [input[i], ...combination];
		}
	}
}
