import { useState } from "react";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setwinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    setBoard([...board.slice(0, index), turn, ...board.slice(index + 1)]);

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setwinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setwinner(false);
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setwinner(null);
  };

  return (
    <>
      <h1>
        The <span>best </span>Tic Tac Toe game on planet Earth
      </h1>
      <main className="board">
        <button onClick={restartGame}>Restart</button>
        <section className="game">
          {board.map((_, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            );
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal restartGame={restartGame} winner={winner} />
      </main>
    </>
  );
}

export default App;
