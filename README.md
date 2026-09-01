# Jogo da Cobrinha

Jogo da cobrinha desenvolvido com HTML, CSS e JavaScript puro para a disciplina
**GAC116 Programação Web** (Atividade Prática 1).

**Jogue agora:** https://mayconss4.github.io/snake-game/

```json
{
  "nome": "Jogo da Cobrinha",
  "descricao": "Versão web do clássico jogo da cobrinha, feita com HTML, CSS e JavaScript puro. O jogador guia a cobrinha pelo tabuleiro para comer maçãs, ganhar pontos e alcançar a meta de cada dificuldade sem bater na parede ou no próprio corpo.",
  "autores": "Maycon Henrique Soares de Sousa",
  "turma": "14A"
}
```

## Objetivo

Conduzir a cobrinha pelo tabuleiro de 20 por 20 quadradinhos e comer a quantidade
de maçãs exigida pela dificuldade escolhida. Cada maçã comida aumenta o corpo da
cobrinha e, a cada 5 maçãs, o jogo fica mais rápido. Quem alcança a meta vence a
partida.

## Regras do jogo

1. A cobrinha anda sozinha e nunca para.
2. Cada maçã vale **10 pontos** e aumenta o corpo em um quadradinho.
3. A cada 5 maçãs comidas a cobrinha fica mais rápida.
4. A partida termina em derrota se a cobrinha bater na parede ou no próprio corpo.
5. A partida termina em vitória quando a meta de maçãs é alcançada.
6. Não é possível virar 180 graus de uma só vez.

### Dificuldades

| Dificuldade | Meta de maçãs | Velocidade inicial |
| --- | --- | --- |
| Fácil | 15 maçãs | 200 ms por passo |
| Médio | 20 maçãs | 150 ms por passo |
| Difícil | 25 maçãs | 110 ms por passo |

O recorde de pontos fica registrado na tela enquanto a página estiver aberta.

## Controles

| Ação | Comando |
| --- | --- |
| Mover a cobrinha | Setas do teclado, teclas `W` `A` `S` `D` ou os botões com setas |
| Pausar e continuar | Barra de espaço ou o botão Pausar |
| Começar a partida | Botão Iniciar Jogo |
| Recomeçar | Botão Reiniciar |

## Instruções de instalação

O jogo não possui dependências e não exige instalação nem etapa de build.

**Opção 1: jogar online**

Acesse https://mayconss4.github.io/snake-game/

**Opção 2: executar localmente**

```bash
git clone https://github.com/mayconss4/snake-game.git
cd snake-game
```

Depois abra o arquivo `index.html` no navegador.

## Tecnologias utilizadas

- **HTML5** para a estrutura da página, o tabuleiro e os controles do jogo.
- **CSS3** para as cores, o layout do tabuleiro com CSS Grid e a adaptação à tela do celular.
- **JavaScript puro** para a lógica do jogo, a manipulação do DOM, o tratamento
  de eventos do teclado e o temporizador com `setInterval`.

## Estrutura do projeto

```
.
├── index.html      Estrutura da página, tabuleiro e controles
├── styles.css      Estilos do jogo
├── script.js       Lógica do jogo
├── favicon.svg     Ícone da página
├── LICENSE         Licença MIT
└── README.md
```

## Publicação no GitHub Pages

O projeto é publicado a partir da branch `main`, pasta raiz, em
**Settings > Pages** do repositório.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
