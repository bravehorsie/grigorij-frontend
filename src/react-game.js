import React from 'react';
import './react-game.css';

const move = {
    X:{literal:"X"},
    O:{literal:"O"}
}
move.X.next = move.O;
move.O.next = move.X;

function calculateWinner(squares) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const calc = () => {
        const xWinner = lines.find(line => {
            return compareFields(squares, line, move.X.literal);
        });
        const yWinner = lines.find(line => {
            return compareFields(squares, line, move.O.literal);
        });

        if (xWinner != null) {
            return move.X;
        }
        if (yWinner != null) {
            return move.O;
        }
        return false;
    };

    const compareFields = (squares, line, literal) => {
        return squares[line[0]] === literal && squares[line[1]] === literal && squares[line[2]] === literal;
    };

    return calc();
}
function Square(props) {
    return (
        <button className="square" onClick={() => props.onclick(props.buttonId)}>
            {props.value}
        </button>
    );
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            nextMove: move.X,
            winner: null
        };
    }
    handleClick = (id) => {
        const squaresCopy = this.state.squares.slice();
        squaresCopy[id] = this.state.nextMove.literal;
        const winner = calculateWinner(squaresCopy);
        this.setState({
            squares: squaresCopy,
            nextMove: this.state.nextMove.next,
            winner: winner ? winner : null
        });
        if (winner) {
            console.log("Winner: " + winner.literal);
        }
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} buttonId={i} onclick={(buttonId) => this.handleClick(buttonId)} />;
    }

    render() {
        let status;
        if (this.state.winner != null) {
            status = "Winner is: " + this.state.winner.literal;
        } else {
            status = 'Next player: ' + this.state.nextMove.literal;
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
            </div>
        );
    }
}

export default Game;

