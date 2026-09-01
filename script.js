const LINHAS = 20;
const COLUNAS = 20;

let cobra = [
    { linha: 10, coluna: 4 },
    { linha: 10, coluna: 3 },
    { linha: 10, coluna: 2 }
];
let direcao = 'direita';
let proximaDirecao = 'direita';
let comida = { linha: 10, coluna: 15 };

let pontos = 0;
let frutas = 0;
let recorde = 0;
let meta = 20;
let velocidade = 150;

let jogoAtivo = false;
let pausado = false;
let temporizador = null;

function criarTabuleiro() {
    const tabuleiro = document.getElementById('tabuleiro');
    for (let i = 0; i < LINHAS * COLUNAS; i++) {
        const celula = document.createElement('div');
        celula.className = 'celula';
        tabuleiro.appendChild(celula);
    }
}

function mudarDificuldade() {
    const dificuldade = document.getElementById('dificuldade').value;
    if (dificuldade == 'facil') {
        meta = 15;
        velocidade = 200;
    } else if (dificuldade == 'medio') {
        meta = 20;
        velocidade = 150;
    } else {
        meta = 25;
        velocidade = 110;
    }
    if (!jogoAtivo) {
        atualizarPlacar();
        mostrarMensagem('Meta de ' + meta + ' maçãs. Clique em Iniciar Jogo.');
    }
}

function iniciarJogo() {
    mudarDificuldade();
    cobra = [
        { linha: 10, coluna: 4 },
        { linha: 10, coluna: 3 },
        { linha: 10, coluna: 2 }
    ];
    direcao = 'direita';
    proximaDirecao = 'direita';
    pontos = 0;
    frutas = 0;
    jogoAtivo = true;
    pausado = false;
    document.getElementById('botaoPausar').textContent = 'Pausar';

    sortearComida();
    atualizarPlacar();
    desenhar();
    mostrarMensagem('Boa sorte! Coma ' + meta + ' maçãs para vencer.');

    clearInterval(temporizador);
    temporizador = setInterval(mover, velocidade);
}

function reiniciarJogo() {
    iniciarJogo();
}

function pausarJogo() {
    if (!jogoAtivo) {
        return;
    }
    if (pausado) {
        pausado = false;
        temporizador = setInterval(mover, velocidade);
        document.getElementById('botaoPausar').textContent = 'Pausar';
        mostrarMensagem('Jogo retomado.');
    } else {
        pausado = true;
        clearInterval(temporizador);
        document.getElementById('botaoPausar').textContent = 'Continuar';
        mostrarMensagem('Jogo pausado.');
    }
}

function sortearComida() {
    let livre = false;
    while (!livre) {
        const linha = Math.floor(Math.random() * LINHAS);
        const coluna = Math.floor(Math.random() * COLUNAS);
        livre = true;
        for (let i = 0; i < cobra.length; i++) {
            if (cobra[i].linha == linha && cobra[i].coluna == coluna) {
                livre = false;
            }
        }
        if (livre) {
            comida = { linha: linha, coluna: coluna };
        }
    }
}

function mudarDirecao(nova) {
    if (!jogoAtivo || pausado) {
        return;
    }
    if (nova == 'cima' && direcao == 'baixo') {
        return;
    }
    if (nova == 'baixo' && direcao == 'cima') {
        return;
    }
    if (nova == 'esquerda' && direcao == 'direita') {
        return;
    }
    if (nova == 'direita' && direcao == 'esquerda') {
        return;
    }
    proximaDirecao = nova;
}

function mover() {
    direcao = proximaDirecao;
    let linha = cobra[0].linha;
    let coluna = cobra[0].coluna;

    if (direcao == 'cima') {
        linha = linha - 1;
    } else if (direcao == 'baixo') {
        linha = linha + 1;
    } else if (direcao == 'esquerda') {
        coluna = coluna - 1;
    } else {
        coluna = coluna + 1;
    }

    if (linha < 0 || coluna < 0 || linha >= LINHAS || coluna >= COLUNAS) {
        encerrarJogo(false, 'A cobrinha bateu na parede.');
        return;
    }

    for (let i = 0; i < cobra.length - 1; i++) {
        if (cobra[i].linha == linha && cobra[i].coluna == coluna) {
            encerrarJogo(false, 'A cobrinha bateu no próprio corpo.');
            return;
        }
    }

    cobra.unshift({ linha: linha, coluna: coluna });

    if (linha == comida.linha && coluna == comida.coluna) {
        pontos = pontos + 10;
        frutas = frutas + 1;
        atualizarPlacar();
        if (frutas >= meta) {
            desenhar();
            encerrarJogo(true, 'Você comeu ' + meta + ' maçãs e venceu o jogo!');
            return;
        }
        sortearComida();
        acelerar();
    } else {
        cobra.pop();
    }

    desenhar();
}

function acelerar() {
    if (frutas % 5 == 0 && velocidade > 70) {
        velocidade = velocidade - 15;
        clearInterval(temporizador);
        temporizador = setInterval(mover, velocidade);
        mostrarMensagem('A cobrinha ficou mais rápida!');
    }
}

function encerrarJogo(venceu, texto) {
    jogoAtivo = false;
    pausado = false;
    clearInterval(temporizador);
    document.getElementById('botaoPausar').textContent = 'Pausar';

    if (pontos > recorde) {
        recorde = pontos;
        texto = texto + ' Novo recorde: ' + recorde + ' pontos.';
    }
    if (venceu) {
        mostrarMensagem('Parabéns! ' + texto);
    } else {
        mostrarMensagem('Fim de jogo! ' + texto + ' Clique em Reiniciar para jogar de novo.');
    }
    atualizarPlacar();
}

function desenhar() {
    const celulas = document.getElementsByClassName('celula');
    for (let i = 0; i < celulas.length; i++) {
        celulas[i].className = 'celula';
    }
    celulas[comida.linha * COLUNAS + comida.coluna].className = 'celula comida';
    for (let i = 0; i < cobra.length; i++) {
        const posicao = cobra[i].linha * COLUNAS + cobra[i].coluna;
        if (i == 0) {
            celulas[posicao].className = 'celula cabeca';
        } else {
            celulas[posicao].className = 'celula corpo';
        }
    }
}

function atualizarPlacar() {
    document.getElementById('pontos').textContent = pontos;
    document.getElementById('frutas').textContent = frutas + '/' + meta;
    document.getElementById('recorde').textContent = recorde;
}

function mostrarMensagem(texto) {
    document.getElementById('mensagem').textContent = texto;
}

document.addEventListener('keydown', function (evento) {
    if (evento.target.tagName == 'SELECT') {
        return;
    }
    const tecla = evento.key.toLowerCase();
    if (tecla == 'arrowup' || tecla == 'w') {
        evento.preventDefault();
        mudarDirecao('cima');
    } else if (tecla == 'arrowdown' || tecla == 's') {
        evento.preventDefault();
        mudarDirecao('baixo');
    } else if (tecla == 'arrowleft' || tecla == 'a') {
        evento.preventDefault();
        mudarDirecao('esquerda');
    } else if (tecla == 'arrowright' || tecla == 'd') {
        evento.preventDefault();
        mudarDirecao('direita');
    } else if (tecla == ' ') {
        evento.preventDefault();
        pausarJogo();
    }
});

criarTabuleiro();
desenhar();
atualizarPlacar();
