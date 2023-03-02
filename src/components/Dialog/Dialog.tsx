import { JSX } from "solid-js";

type Props = {
  score: number;
  showDialog: boolean;
  onClose: JSX.EventHandlerUnion<HTMLDialogElement, Event>;
};

function Dialog(props: Props) {
  return (
    <dialog open={props.showDialog} onClose={props.onClose}>
      <form method="dialog">
        <p>Your score is: {props.score}</p>
        <p>Do you want to play again?</p>
        <button value="1">Yes</button>
        <button value="0">No</button>
      </form>
    </dialog>
  );
}

export default Dialog;
