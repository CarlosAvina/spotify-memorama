import { createSignal } from "solid-js";
import styles from "./App.module.css";

function App() {
  const [flippedCards, setFlippedCards] = createSignal([]);
  const [selectedCard, setSelectedCard] = createSignal();

  const grid = Array.from(Array(16).keys(), (_, i) => i + 1);
  const correctAnswer = Math.round(Math.random() * 16);

  function isCardFlipped(element) {
    return flippedCards().some((item) => item === element);
  }

  return (
    <div class={styles.app}>
      <div class={styles.grid}>
        {grid.map((item) => (
          <button
            class={`${styles.flipCard} ${
              isCardFlipped(item) ? styles.flipCardClick : null
            } ${selectedCard() === item ? styles.selectedCard : null}`}
            onClick={() => {
              setSelectedCard(item);
              setFlippedCards([...flippedCards(), item]);
            }}
          >
            <div
              class={`${styles.flipCardInner} ${
                isCardFlipped(item) ? styles.flipCardClick : null
              }`}
            >
              <div class={styles.flipCardFront}></div>
              <div class={styles.flipCardBack}>
                <p class={styles.cardBackText}>{item}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div>
        <h1>Find number: {correctAnswer}</h1>
        <button
          onClick={() => {
            if (selectedCard() === correctAnswer) {
              alert("You win");
              setFlippedCards([]);
              setSelectedCard();
            } else {
              alert("Wrong answer");
            }
          }}
        >
          Choose
        </button>
      </div>
    </div>
  );
}

export default App;
