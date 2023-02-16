import { Navigate } from "@solidjs/router";
import { createSignal, onCleanup, createEffect } from "solid-js";
import styles from "./Game.module.css";

import { getHashParams, mergeClasses } from "../../utils/utils";
import { stateKey } from "../../constants/constants";

const numberOfCards = 16;
const randomAnswer = () => Math.round(Math.random() * numberOfCards);
const initialTime = 30;

function Game() {
  const [flippedCards, setFlippedCards] = createSignal([]);
  const [selectedCard, setSelectedCard] = createSignal();
  const [correctAnswer, setCorrectAnswer] = createSignal(randomAnswer());
  const [timer, setTimer] = createSignal(initialTime);
  const [tracks, setTracks] = createSignal([]);

  let audioElement;
  const grid = Array.from(Array(numberOfCards).keys(), (_, i) => i + 1);

  createEffect(() => {
    if (tracks().length) {
      audioElement.play();
    }
  });

  const params = getHashParams();

  const access_token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem(stateKey);

  if (access_token && (state == null || state !== storedState)) {
    return <Navigate href="/" />;
  } else {
    localStorage.removeItem(stateKey);
    if (access_token) {
      fetch("https://api.spotify.com/v1/me/tracks", {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }).then(async (res) => {
        const response = await res.json();

        if (!res.ok) throw Error("spotify error", { cause: response });

        setTracks(response.items);
      });
    }
  }

  function startGame() {
    const interval = setInterval(() => {
      if (timer() > 0) setTimer((timer) => timer - 1);
      if (timer() === 0) resetGame({ win: false });
    }, 1000);

    onCleanup(() => clearInterval(interval));
  }

  function resetGame({ win }) {
    setFlippedCards([]);
    setSelectedCard();
    setTimer(initialTime);
    setCorrectAnswer(randomAnswer());

    const alertText = win ? "You win!" : "You lose";
    alert(alertText);
  }

  function isCardFlipped(element) {
    return flippedCards().some((item) => item === element);
  }

  return (
    <div class={styles.app}>
      <div class={styles.grid}>
        {grid.map((item) => (
          <button
            class={mergeClasses(
              styles.flipCard,
              isCardFlipped(item) ? styles.flipCardClick : null,
              selectedCard() === item ? styles.selectedCard : null
            )}
            onClick={() => {
              setSelectedCard(item);
              setFlippedCards([...flippedCards(), item]);
            }}
          >
            <div
              class={mergeClasses(
                styles.flipCardInner,
                isCardFlipped(item) ? styles.flipCardClick : null
              )}
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
        <button type="button" onClick={startGame}>
          Start
        </button>
        <h1>Timer: {timer()}</h1>
        <h1>Find number: {correctAnswer()}</h1>
        <button
          type="button"
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

        <audio ref={audioElement} controls>
          {tracks().length && (
            <source
              src={tracks().length ? tracks()[0].track.preview_url : null}
            ></source>
          )}
          Not supported by your browser
        </audio>
      </div>
    </div>
  );
}

export default Game;
