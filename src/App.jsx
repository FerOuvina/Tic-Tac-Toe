import { useState } from "react";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { Game } from "./components/Game.jsx";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [board, setBoard] = useState(() => {
    const storedBoard = window.localStorage.getItem("board");
    if (storedBoard) {
      return JSON.parse(storedBoard);
    }
    return Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const storedTurn = window.localStorage.getItem("turn");
    if (storedTurn) {
      return storedTurn;
    }
    return TURNS.X;
  });

  const [winner, setwinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    setBoard([...board.slice(0, index), turn, ...board.slice(index + 1)]);

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", newTurn);

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

    window.localStorage.removeItem("board");
    window.localStorage.removeItem("turn");
  };

  return (
    <>
      <h1>
        The <span>best </span>Tic Tac Toe game on planet Earth
      </h1>

      <main className="board">
        <button onClick={restartGame}>Restart</button>
        <Game board={board} updateBoard={updateBoard} />

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
