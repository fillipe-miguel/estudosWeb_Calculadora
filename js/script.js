let display = document.getElementById('display');
let semiDisplay = document.getElementById('semiDisplay');
let numeros = document.querySelectorAll('[id*=tecla]');
let operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

numeros.forEach((numero) => {
	numero.addEventListener('click', colocarNumero);
});

function colocarNumero() {
	atualizarDisplay(this.textContent);
}

// Display

function atualizarDisplay(numero) {
	if (novoNumero) {
		display.textContent = numero;
		novoNumero = false;
	} else {
		display.textContent += numero;
	}
}

function atualizarSemiDisplay(value) {
	if (value == '') {
		semiDisplay.textContent = `${numeroAnterior} ${operador}`;
	} else {
		semiDisplay.textContent = `${numeroAnterior} ${operador} ${value} =`;
	}
}

function resetDisplay() {
	atualizarDisplay('');
	atualizarSemiDisplay('');
}

let displayVazio = () => display.textContent == '';

// Operadores

operadores.forEach((operador) => {
	operador.addEventListener('click', operar);
});

function operar() {
	if (!displayVazio()) {
		if (!novoNumero) {
			calcular();
			novoNumero = true;

			numeroAnterior = parseFloat(display.textContent);
			operador = this.textContent;
			resetDisplay();
		} else if (novoNumero) {
			numeroAnterior = parseFloat(display.textContent);
			operador = this.textContent;
			resetDisplay();
		}
	}
}

let operacaoPendente = () => {
	return operador != undefined;
};

function calcular() {
	let numeroAtual = parseFloat(display.textContent);

	if (operacaoPendente()) {
		atualizarSemiDisplay(numeroAtual);

		novoNumero = true;
		if (operador == '+') {
			atualizarDisplay(numeroAnterior + numeroAtual);
		} else if (operador == '-') {
			atualizarDisplay(numeroAnterior - numeroAtual);
		} else if (operador == '*') {
			atualizarDisplay(numeroAnterior * numeroAtual);
		} else if (operador == '/') {
			atualizarDisplay(numeroAnterior / numeroAtual);
		}

		numeroAnterior = '';
		novoNumero = true;
	}
}

// Botão de igual

document.getElementById('igual').addEventListener('click', igual);

function igual() {
	if (!displayVazio()) {
		calcular();
		operador = undefined;
	} else if (displayVazio()) {
		atualizarDisplay(numeroAnterior);
	}
}

// botão clear all

document.getElementById('apagarTudo').addEventListener('click', clearAll);

function clearAll() {
	operador = '';
	numeroAnterior = '';
	numeroAtual = '';
	novoNumero = true;
	resetDisplay('');
	// Mutreta para atualizar o display de cima sem o undefined
	operador = undefined;
}

// botão clear valor

document.getElementById('apagarValor').addEventListener('click', limparValor);

function limparValor() {
	novoNumero = true;
	atualizarDisplay('');
}

// botão backSpace

document.getElementById('backSpace').addEventListener('click', backSpace);

function backSpace() {
	novoNumero = true;
	atualizarDisplay(display.textContent.slice(0, -1));
}

// botão mais ou menos

document.getElementById('maisoumenos').addEventListener('click', maisoumenos);

function maisoumenos() {
	novoNumero = true;
	if (!displayVazio()) {
		console.log('asd');
		atualizarDisplay(display.textContent * -1);
	}
}
