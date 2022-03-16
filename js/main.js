import Game from './Game.js';
import GameView from './GameView.js';

const gameContainer = document.getElementById('app');

const gameView = new GameView(gameContainer);
let game = new Game();

gameView.onTileClick = (e) => {
    const index = e.target.getAttribute('data-index');
    game.makeTurn(index);
    gameView.update(game);
}

gameView.onRestartClick = (e) => {
    game = new Game();
    gameView.update(game);
}

gameView.update(game);