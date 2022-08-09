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
 * Complete the 'alternate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternate(s) {
	// Write your code here
	// Função que vai fazer a "contagem"
	const contar = (arr) => {
		let maximo = 0;
		arr.forEach((par) => {
			let primeiraVez = null;
			let count = 0;
			for (let i = 0; i < s.length; i++) {
				if (s[i] === par[0]) {
					if (primeiraVez === null || !primeiraVez) {
						primeiraVez = true;
						count++;
					} else break;
				} else if (s[i] === par[1]) {
					if (primeiraVez === null || primeiraVez) {
						primeiraVez = false;
						count++;
					} else break;
				}
				if (i === s.length - 1 && count > maximo) {
					maximo = count;
				}
			}
		});
		return maximo;
	};

	// 'Inicializamos' o objeto
	const m = {};
	for (let i = 0, len = s.length; i < len; i++) {
		if (m[s[i]]) {
			m[s[i]]++;
		} else {
			m[s[i]] = 1;
		}
	}
	// Ordenamos as keys do objeto
	const ordenada = Object.keys(m).sort((a, b) => m[a] > m[b]);

	let pares = [];
	for (let i = 0; i < ordenada.length; i++) {
		for (let j = i + 1; j < ordenada.length; j++) {
			Math.abs(m[ordenada[i]] - m[ordenada[j]]) <= 1 ? pares.push([ordenada[i], ordenada[j]]) : null;
		}
	}
	return contar(pares);
}

function main() {
	const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

	const l = parseInt(readLine().trim(), 10);

	const s = readLine();

	const result = alternate(s);

	ws.write(result + '\n');

	ws.end();
}
