/* eslint-disable react/prop-types */
import { Square } from "./Square";

export function WinnerModal({ winner, restartGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "It's a draw" : `The winner is: `;
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>

        <div>
          <button onClick={restartGame}>Play again</button>
        </div>
      </div>
    </section>
  );
}
