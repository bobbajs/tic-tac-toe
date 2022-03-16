export default class GameView {
    constructor(element) {
        this.container = element;
        this.container.innerHTML = `
            <div class="header">
                <div id="playerTurn">X's turn</div>
                <div id="gameStatus">In Progress</div>
                <button id="refreshButton" class="material-icons">refresh</button>
            </div>
            <div class="board">
                <div class="board__tile" data-index="0"></div>
                <div class="board__tile" data-index="1"></div>
                <div class="board__tile" data-index="2"></div>
                <div class="board__tile" data-index="3"></div>
                <div class="board__tile" data-index="4"></div>
                <div class="board__tile" data-index="5"></div>
                <div class="board__tile" data-index="6"></div>
                <div class="board__tile" data-index="7"></div>
                <div class="board__tile" data-index="8"></div>
            </div>
        `;

        this.onTileClick = undefined;
        this.onRestartClick = undefined;

        this.container.querySelectorAll('.board__tile').forEach(tile => {
            tile.addEventListener('click', (e) => {
                if (this.onTileClick) {
                    this.onTileClick(e);
                }
            })
        });

        this.container.querySelector('#refreshButton').addEventListener('click', () => {
            if (this.onRestartClick) {
                this.onRestartClick();
            }
        });
    }

    update(game) {
       this.updateStatus(game);
       this.updateTurn(game);
       this.updateBoard(game);
    }

    updateTurn(game) {
        this.container.querySelector('#playerTurn').innerText = `${game.turn}'s turn`;
    }

    updateStatus(game) {
        let status = 'Game In Progress';

        if (game.findWinningCombinations()) {
            status = `${game.turn} is the WINNER!`;
        } else if (!game.isInProgress() && !game.findWinningCombinations()) {
            status = `Tie game!`
        }

        this.container.querySelector('#gameStatus').innerText = status;
    }

    updateBoard(game) {
        const combination = game.findWinningCombinations();

        this.container.querySelectorAll('.board__tile').forEach((tile, index) => {
            tile.innerText = game.board[index];

            tile.classList.remove('winning-tile');
            if ((combination || []).includes(index)) {
                tile.classList.add('winning-tile');
            }
        });


    }
}