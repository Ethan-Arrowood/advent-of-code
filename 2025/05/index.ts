import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ingredientIDsInput = readFileSync(join(import.meta.dirname, 'ingredientIDs.txt'), 'utf-8');
const ingredientRangesInput = readFileSync(join(import.meta.dirname, 'ingredientRanges.txt'), 'utf-8');

const ingredientRangesSample = `
3-5
10-14
16-20
12-18
`

const ingredientIDsSample = `
1
5
8
11
17
32
`;

function part1(rangesInput: string, idsInput: string) {
	const ranges = rangesInput.trim().split('\n').map(range => range.split('-').map(Number));
	const ids = idsInput.trim().split('\n').map(Number);

	const fresh = [];

	for (const id of ids) {
		for (const [lower, upper] of ranges) {
			if (id >= lower && id <= upper) {
				fresh.push(id);
				break;
			}
		}
	}

	console.log(fresh.length);
}

part1(ingredientRangesSample, ingredientIDsSample);
part1(ingredientRangesInput, ingredientIDsInput);

// function part2(rangesInput: string) {
// 	const ranges = rangesInput.trim().split('\n').map(range => range.split('-').map(Number));
// 	const fresh = [ranges[0]];
// 	newRange: for (const [newLower, newUpper] of ranges.slice(1)) {
// 		for (let i = 0; i < fresh.length; i++) {
// 			const [existingLower, existingUpper] = fresh[i];
// 			// new is fully contained within existing ; do nothing
// 			if (newLower >= existingLower && newUpper <= existingUpper) {
// 				continue newRange;
// 			}
// 			// new lower bound, and new upper is within existing ; update lower bound
// 			else if (newLower < existingLower && newUpper >= existingLower && newUpper <= existingUpper) {
// 				fresh[i][0] = newLower;
// 				continue newRange;
// 			}
// 			// new upper bound, and new lower is within existing ; update upper bound
// 			else if (newUpper > existingUpper && newLower <= existingUpper && newLower >= existingLower) {
// 				fresh[i][1] = newUpper;
// 				continue newRange;
// 			}
// 			// new lower and upper fully encompassing existing
// 			else if (newLower < existingLower && newUpper > existingUpper) {
// 				fresh[i] = [newLower, newUpper];
// 				continue newRange;
// 			}
// 		}
// 		fresh.push([newLower, newUpper]);
// 	}

// 	let total = fresh.reduce((prev, [lower, upper]) => prev += upper - lower, 0);

// 	console.log(total);
// }

type Range = [number,number];
function intersect(a: Range, b: Range): Range | null {
	const [existingLower, existingUpper] = a;
	const [newLower, newUpper] = b;
	// new is fully within existing; do nothing
	if (newLower >= existingLower && newUpper <= existingUpper) return [existingLower, existingUpper];
	// new lower bound, and new upper is within existing ; update lower bound
	else if (newLower < existingLower && newUpper >= existingLower && newUpper <= existingUpper) {
		return [newLower, existingUpper];
	}
	// new upper bound, and new lower is within existing ; update upper bound
	else if (newUpper > existingUpper && newLower <= existingUpper && newLower >= existingLower) {
		return [existingLower, newUpper];
	}
	// new lower and upper fully encompassing existing
	else if (newLower < existingLower && newUpper > existingUpper) {
		return [newLower, newUpper];
	}
	else return null;
}

function reduceRanges(ranges: Range[]) {
	let result = [ranges.shift()];
	for (const range of ranges) {
		let intersectedAtleastOnce = false;
		for (let i = 0; i < result.length; i++) {
			let intersection = intersect(result[i], range);
			if (intersection) {
				result[i] = intersection;
				intersectedAtleastOnce = true;
			}
		}
		if (intersectedAtleastOnce) {
			result = reduceRanges(result);
		} else {
			result.push(range);
		}
	}
	return result;
}

// AI simplification
function reduceRangesSimplified(ranges: Range[]) {
	if (ranges.length === 0) return [];

	// By sorting by the lower bound we only ever have to
	// check that each range intersects with the previous
	const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
	const result = [sorted[0]];

	for (let i = 0; i < sorted.length; i++) {
		const last = result[result.length - 1];
		const intersection = intersect(last, sorted[i]);
		if (intersection) {
			result[result.length - 1] = intersection
		} else {
			result.push(sorted[i]);
		}
	}

	return result;
}

function part2(input: string) {
	const inputRanges = input.trim().split('\n').map(range => range.split('-').map(Number)) as Range[];
	const fresh = reduceRanges(inputRanges);
	const total = fresh.reduce((prev, [lower, upper]) => prev += upper - lower + 1, 0);
	console.log(total);
}



part2(ingredientRangesSample); // 14
part2(ingredientRangesInput); // 352716206375547
