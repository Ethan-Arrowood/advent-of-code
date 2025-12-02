const sample = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;
const input = `989133-1014784,6948-9419,13116184-13153273,4444385428-4444484883,26218834-26376188,224020-287235,2893-3363,86253-115248,52-70,95740856-95777521,119-147,67634135-67733879,2481098640-2481196758,615473-638856,39577-47612,9444-12729,93-105,929862406-930001931,278-360,452131-487628,350918-426256,554-694,68482544-68516256,419357748-419520625,871-1072,27700-38891,26-45,908922-976419,647064-746366,9875192107-9875208883,3320910-3352143,1-19,373-500,4232151-4423599,1852-2355,850857-889946,4943-6078,74-92,4050-4876`;
function part1(input: string) {
	const ranges = input.split(',');
	let sum = 0;
	for (const range of ranges) {
		const [lowerBound, upperBound] = range.split('-');
		for (let i = parseInt(lowerBound); i <= parseInt(upperBound); i++) {
			let s = i.toString();

			if (s.length % 2 !== 0) continue;
			if (s.slice(0, s.length / 2) === s.slice(s.length / 2)) sum += i;
		}
	}

	console.log(sum);
}

part1(input);

function part2(input: string) {
	const ranges = input.split(',');
	let sum = 0;
	for (const range of ranges) {
		const [lowerBound, upperBound] = range.split('-');
		for (let i = parseInt(lowerBound); i <= parseInt(upperBound); i++) {
			let s = i.toString();

			for (let l = 1; l <= Math.floor(s.length / 2); l++) {
				if (s.slice(0, l).repeat(s.length / l) === s) {
					sum += i;
					break;
				}
			}
		}
	}

	console.log(sum);
}

part2(input);
