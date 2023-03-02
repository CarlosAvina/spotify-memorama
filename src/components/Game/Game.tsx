import { Navigate, useNavigate } from "@solidjs/router";
import { createSignal, onCleanup, createEffect } from "solid-js";
import styles from "./Game.module.css";

import { SongCard, Dialog } from "../";

import { getHashParams } from "../../utils/utils";
import { stateKey } from "../../constants/constants";

const numberOfCards = 16;
const randomAnswer = () => Math.floor(Math.random() * numberOfCards);
const initialTime = 30;

function Game() {
  const [flippedCards, setFlippedCards] = createSignal<Array<number>>([]);
  const [selectedCard, setSelectedCard] = createSignal();
  const [correctAnswer, setCorrectAnswer] = createSignal(randomAnswer());
  const [timer, setTimer] = createSignal(initialTime);
  // TODO: fix any type
  const [tracks, setTracks] = createSignal<any>([]);
  const [score, setScore] = createSignal(0);
  const [lives, setLives] = createSignal(3);
  const [gameOverDialog, setGameOverDialog] = createSignal(false);

  const navigate = useNavigate();

  let audioElement: HTMLAudioElement;
  const grid = Array.from(Array(numberOfCards).keys());

  createEffect(() => {
    if (lives() === 0) {
      setGameOverDialog(true);
    }
  });

  // TODO: fix any type
  const trackImages = () =>
    tracks().map((item: any) => item.track.album.images[0]);
  const currentAudioSrc = () => tracks()[correctAnswer()].track.preview_url;

  const params = getHashParams();

  const access_token = params.access_token,
    state = params.state,
    storedState = localStorage.getItem(stateKey);

  if (access_token && (state == null || state !== storedState)) {
    return <Navigate href="/" />;
  } else {
    localStorage.removeItem(stateKey);
    if (access_token) {
      fetch("https://api.spotify.com/v1/me/tracks?limit=16&offset=0", {
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
    audioElement.play();

    const interval = setInterval(() => {
      if (timer() > 0) setTimer((timer) => timer - 1);
      if (timer() === 0) {
        prepareNextLevel({ scorePoint: false });
        setLives((prev) => prev - 1);
        alert("Time is over");
      }
    }, 1000);

    onCleanup(() => clearInterval(interval));
  }

  function resetGame({ hardReset }: { hardReset: boolean }) {
    setFlippedCards([]);
    setSelectedCard();
    setTimer(initialTime);
    setCorrectAnswer(randomAnswer());

    if (hardReset) {
      setScore(0);
      setLives(3);
    }

    audioElement.currentTime = 0;
    audioElement.src = tracks()[correctAnswer()].track.preview_url;
    audioElement.play();
  }

  function prepareNextLevel({ scorePoint }: { scorePoint: boolean }) {
    resetGame({ hardReset: false });

    setScore((value) => {
      if (scorePoint) return value + 1;
      return value;
    });
  }

  function isCardFlipped(element: number) {
    return flippedCards().some((item) => item === element);
  }

  function flipSongCard(item: number) {
    setSelectedCard(item);
    setFlippedCards((prev) => [...prev, item]);
  }

  function onChooseCard() {
    if (selectedCard() === correctAnswer()) {
      prepareNextLevel({ scorePoint: true });
      alert("Correct answer!");
    } else {
      setLives((prev) => prev - 1);
      alert("Wrong answer");
    }
  }

  function onGameOver(
    e: Event & {
      currentTarget: HTMLDialogElement;
      target: Element;
    }
  ) {
    const continuePlaying = Boolean(Number(e.currentTarget.returnValue));

    if (!continuePlaying) navigate("/");

    setGameOverDialog(false);
    resetGame({ hardReset: true });
  }

  return (
    <div class={styles.app}>
      <div class={styles.grid}>
        {grid.map((item) => (
          <SongCard
            trackImage={trackImages()[item]}
            isCardFlipped={isCardFlipped(item)}
            isCardSelected={selectedCard() === item}
            flipSongCard={() => flipSongCard(item)}
          />
        ))}
      </div>
      <div>
        <button type="button" onClick={startGame}>
          Start
        </button>
        <h1>Lives: {lives()}</h1>
        <h1>Score: {score()}</h1>
        <h1>Timer: {timer()}</h1>
        <button type="button" onClick={onChooseCard}>
          Choose
        </button>
        {/* TODO: fix typescript issue */}
        {/* @ts-ignore */}
        <audio class={styles.hidAudio} ref={audioElement} controls>
          {tracks().length && <source src={currentAudioSrc()}></source>}
          Not supported by your browser
        </audio>
      </div>
      <Dialog
        score={score()}
        showDialog={gameOverDialog()}
        onClose={onGameOver}
      />
    </div>
  );
}

export default Game;
