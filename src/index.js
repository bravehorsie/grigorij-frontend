import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const move = {
    X:{literal:"X"},
    Y:{literal:"Y"}
}
move.X.next = move.Y;
move.Y.next = move.X;

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
            nextMove: move.X
        };
    }
    handleClick = (id) => {
        const sqaresCopy = this.state.squares.slice();
        sqaresCopy[id] = this.state.nextMove.literal;

        this.setState({squares: sqaresCopy, nextMove: this.state.nextMove.next})
        console.log("State of ID " + id + " changed to " + sqaresCopy[id]);
    }
    renderSquare(i) {
        return <Square value={this.state.squares[i]} buttonId={i} onclick={(buttonId) => this.handleClick(buttonId)} />;
    }

    render() {
        const status = 'Next player: ' + this.state.nextMove.literal;

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
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

