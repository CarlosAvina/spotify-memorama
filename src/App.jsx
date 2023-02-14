import { createSignal, onCleanup } from "solid-js";
import styles from "./App.module.css";

const numberOfCards = 16;
const randomAnswer = Math.round(Math.random() * numberOfCards);
const initialTime = 15;

function App() {
  const [flippedCards, setFlippedCards] = createSignal([]);
  const [selectedCard, setSelectedCard] = createSignal();
  const [correctAnswer, setCorrectAnswer] = createSignal(randomAnswer);
  const [timer, setTimer] = createSignal(initialTime);

  const grid = Array.from(Array(numberOfCards).keys(), (_, i) => i + 1);

  const interval = setInterval(() => {
    if (timer() > 0) setTimer((timer) => timer - 1);
    if (timer() === 0) resetGame({ win: false });
  }, 1000);

  onCleanup(() => clearInterval(interval));

  function isCardFlipped(element) {
    return flippedCards().some((item) => item === element);
  }

  function resetGame({ win }) {
    setFlippedCards([]);
    setSelectedCard();
    setTimer(initialTime);
    setCorrectAnswer(randomAnswer);

    const alertText = win ? "You win!" : "You lose";
    alert(alertText);
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
        <h1>Timer: {timer()}</h1>
        <h1>Find number: {correctAnswer()}</h1>
        <button
          onClick={() => {
            if (selectedCard() === correctAnswer()) {
              resetGame({ win: true });
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
