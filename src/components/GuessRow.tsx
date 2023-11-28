import { GAME_WORD_LEN, LetterState } from "../constants";
import classNames from "classnames";
import css from "./GuessRow.module.css";


type Props = {
  guess: string | undefined;
  letterStates: Array<LetterState>
};

export const GuessRow = ({ guess, letterStates }: Props) => {

  return (
    <div className="flex gap-2">
      {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => {

        return (
          <Tile
            key={idx}
            letter={guess ? guess[idx] : ""}
            state={letterStates[idx]}
          />
        );
      })}
    </div>
  );
};


type TileProps = {
  letter: string | undefined;
  state: LetterState;
};

export const Tile = ({ letter, state }: TileProps) => {
  return (
    <div
      className={classNames(
        "border  w-16 h-16 flex justify-center items-center text-3xl font-bold",
        {
          [css.hasLetter]: !!letter,
          'border-gray-500': state === 'unsubmitted',
          [css.correct]: state === "correct",
          [css.wrong]: state === "wrong",
          [css.wrongPlace]: state === "wrong-place",
        }
      )}
    >
      {letter}
    </div>
  );
};
