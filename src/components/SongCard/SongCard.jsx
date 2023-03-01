import styles from "./SongCard.module.css";
import { mergeClasses } from "../../utils/utils";

function SongCard(props) {
  return (
    <button
      class={mergeClasses(
        styles.flipCard,
        props.isCardFlipped ? styles.flipCardClick : null,
        props.isCardSelected ? styles.selectedCard : null
      )}
      onClick={props.flipSongCard}
    >
      <div
        class={mergeClasses(
          styles.flipCardInner,
          props.isCardFlipped ? styles.flipCardClick : null
        )}
      >
        <div class={styles.flipCardFront}></div>
        <div class={styles.flipCardBack}>
          {props.trackImage ? (
            <img
              class={styles.cardBackImage}
              src={props.trackImage.url}
              width={props.trackImage.width}
              height={props.trackImage.height}
            />
          ) : null}
        </div>
      </div>
    </button>
  );
}

export default SongCard;
