export default class Game {
    constructor() {
        this.turn = 'X';
        this.board = Array(9).fill(null);
    }

    nextTurn() {
        this.turn = this.turn === 'X' ? 'O' : 'X';
    }

    makeTurn(i) {
        if (!this.isInProgress()) {
            return;
        }

        if (this.findWinningCombinations()) {
            return;
        }

        if (!this.board[i]) {
            this.board[i] = this.turn;
        }

        if (this.isInProgress()) {
            this.nextTurn();
        }
    }

    findWinningCombinations() {
        const combinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        for (let combination of combinations) {
            const [a, b, c] = combination;

            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                return [a,b,c];
            }
        }

        return null;
    }

    isInProgress() {
        return this.board.includes(null) && this.findWinningCombinations() === null;
    }
}