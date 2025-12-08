import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const input = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8');

const sample = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

type Point = [x: number, y: number, z: number];

function distance(p: Point, q: Point): number {
	return Math.sqrt(
		(p[0] - q[0]) ** 2 +
		(p[1] - q[1]) ** 2 +
		(p[2] - q[2]) ** 2
	)
}

function part1(input: string, connectionLimit: number) {
	const junctionBoxes = input.split('\n').map((coords) => coords.split(',').map(Number)) as Point[];
	const distances = [];
	for (let i = 0; i < junctionBoxes.length; i++) {
		const p = junctionBoxes[i];
		for (let j = i + 1; j < junctionBoxes.length; j++) {
			const q = junctionBoxes[j];
			const d = distance(p, q);
			distances.push([d, p.join(','), q.join(',')]);
		}
	}

	distances.sort((a, b) => a[0] - b[0]);

	const circuits = new Set();
	const boxToCircuit = new Map();
	let connections = 0;
	for (let i = 0; i < distances.length; i++) {
		if (connections === connectionLimit) break;
		const [d, p, q] = distances[i];
		const pCircuit = boxToCircuit.get(p);
		const qCircuit = boxToCircuit.get(q);
		if (pCircuit && qCircuit && pCircuit === qCircuit) {
			// If the nodes are part of the same circuit, just increment the connections count.
			// You can still form a connection between two nodes already within a circuit.
			connections++;
			continue;
		} else if (pCircuit && qCircuit && pCircuit !== qCircuit) {
			// If the nodes are part of separate circuits, increment the connections count and
			// merge the circuits.
			const newCircuit = new Set([...pCircuit, ...qCircuit]);
			circuits.add(newCircuit);
			circuits.delete(pCircuit);
			circuits.delete(qCircuit);
			for (const node of newCircuit) {
				boxToCircuit.set(node, newCircuit);
			}
			connections++;
		} else if (pCircuit) {
			// If p node is part of a circuit, add q to that circuit and increment connections count
			pCircuit.add(q);
			boxToCircuit.set(q, pCircuit);
			connections++;
		} else if (qCircuit) {
			// If q node is part of a circuit, add p to that circuit and increment connections count
			qCircuit.add(p);
			boxToCircuit.set(p, qCircuit);
			connections++;
		} else if (!pCircuit && !qCircuit) {
			// Otherwise, if neither nodes are part of any circuits, create a new circuit and increment connections count.
			const circuit = new Set([p, q]);
			boxToCircuit.set(p, circuit);
			boxToCircuit.set(q, circuit);
			circuits.add(circuit);
			connections++;
		}
	}

	const threeLargestCircuits = [...circuits].sort((a: Set<string>, b: Set<string>) => b.size - a.size).slice(0,3);
	console.log(threeLargestCircuits.reduce((t: number, s: Set<string>) => t *= s.size, 1));
}

part1(sample, 10);
part1(input, 1000);

function part2(input: string) {
	const junctionBoxes = input.split('\n').map((coords) => coords.split(',').map(Number)) as Point[];
	const distances = [];
	for (let i = 0; i < junctionBoxes.length; i++) {
		const p = junctionBoxes[i];
		for (let j = i + 1; j < junctionBoxes.length; j++) {
			const q = junctionBoxes[j];
			const d = distance(p, q);
			distances.push([d, p.join(','), q.join(',')]);
		}
	}

	distances.sort((a, b) => a[0] - b[0]);

	const circuits = new Set();
	const boxToCircuit = new Map();

	for (let i = 0; i < distances.length; i++) {
		const [d, p, q] = distances[i];
		const pCircuit = boxToCircuit.get(p);
		const qCircuit = boxToCircuit.get(q);
		if (pCircuit && qCircuit && pCircuit === qCircuit) {
			continue;
		} else if (pCircuit && qCircuit && pCircuit !== qCircuit) {
			const newCircuit = new Set([...pCircuit, ...qCircuit]);
			circuits.add(newCircuit);
			circuits.delete(pCircuit);
			circuits.delete(qCircuit);
			for (const node of newCircuit) {
				boxToCircuit.set(node, newCircuit);
			}
		} else if (pCircuit) {
			pCircuit.add(q);
			boxToCircuit.set(q, pCircuit);
		} else if (qCircuit) {
			qCircuit.add(p);
			boxToCircuit.set(p, qCircuit);
		} else if (!pCircuit && !qCircuit) {
			const circuit = new Set([p, q]);
			boxToCircuit.set(p, circuit);
			boxToCircuit.set(q, circuit);
			circuits.add(circuit);
		}

		if (circuits.size === 1 && [...circuits][0].size === junctionBoxes.length) {
			console.log(p, q);
			console.log(parseInt(p.split(',')[0]) * parseInt(q.split(',')[0]))
			break;
		}
	}
}

part2(sample);
part2(input);