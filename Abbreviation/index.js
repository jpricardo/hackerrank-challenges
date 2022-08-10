'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
	inputString += inputStdin;
});

process.stdin.on('end', function () {
	inputString = inputString.split('\n');

	main();
});

function readLine() {
	return inputString[currentLine++];
}

/*
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function abbreviation(a, b) {
	// Write your code here

	// Solução utilizando recursão
	const calcular = (a, b) => {
		// Definimos as condições de parada
		if (a.length < b.length) return false;
		if (a.toUpperCase() === b) return true;
		if (b.length === 0) return a === a.toLowerCase();
		// Caso a primeira letra de a seja maiúscula => se primeiras letras forem iguais, pulamos pras próximas. Caso sejam diferentes, é falso.
		if (a[0] === a[0].toUpperCase()) return a[0] === b[0] ? calcular(a.slice(1), b.slice(1)) : false;
		// Caso a primeira letra de a maiúscula seja diferente da primeira letra de b
		// Comparamos a próxima letra de a com b
		// Do contrário comparamos a próx letra de a com a próx de b. Caso falso, comparamos a próx. de a com b.
		return a[0].toUpperCase() !== b[0] ? calcular(a.slice(1), b) : calcular(a.slice(1), b.slice(1)) || calcular(a.slice(1), b);
	};
	return calcular(a, b) ? 'YES' : 'NO';
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const q = parseInt(readLine().trim(), 10);

	for (let qItr = 0; qItr < q; qItr++) {
		const a = readLine();

		const b = readLine();

		const result = abbreviation(a, b);

		ws.write(result + '\n');
	}

	ws.end();
}
