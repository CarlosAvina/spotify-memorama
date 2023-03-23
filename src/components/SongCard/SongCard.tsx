import { mergeClasses } from "../../utils/utils";

type TrackImage = {
  width: string;
  height: string;
  url: string;
};

type Props = {
  trackImage: TrackImage;
  isCardFlipped: boolean;
  isCardSelected: boolean;
  flipSongCard: () => void;
};

function SongCard(props: Props) {
  return (
    <button
      class={mergeClasses(
        "bg-transparent w-52 h-52 cursor-pointer p-0 perspective rounded-md",
        props.isCardFlipped ? "rotate-y-180" : null,
        props.isCardSelected ? "border-4 border-solid border-yellow-300" : null
      )}
      onClick={props.flipSongCard}
    >
      <div
        class={mergeClasses(
          "relative w-full h-full text-center transition-transform duration-500 transform-style",
          props.isCardFlipped ? "rotate-y-180" : null
        )}
      >
        <div class="absolute w-full h-full bg-sky-500 text-black backface-visibility"></div>
        <div class="absolute w-full h-full bg-slate-500 text-white rotate-y-180 backface-visibility">
          {props.trackImage ? (
            <img
              class="rotate-y-180 w-full h-full overflow-hidden"
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
