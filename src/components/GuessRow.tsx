import { GAME_WORD_LEN } from "../constants";
import classNames from "classnames";
import css from "./GuessRow.module.css";

const replaceCharAtIndex = (str: string, idx: number, newChar: string) => {
  return str.substring(0, idx) + newChar + str.substring(idx + 1, str.length);
};

const getTileStates = (
  solution: string,
  guess: string | undefined,
  isSubmitted: boolean
) => {
  const tileStates: Array<TileState> = Array.from<TileState>({
    length: GAME_WORD_LEN,
  }).fill("unsubmitted");
  if (!isSubmitted || !guess) {
    return tileStates;
  }

  for (let i = 0; i < solution.length; i++) {
    if (guess[i] === solution[i]) {
      tileStates[i] = "correct";
      solution = replaceCharAtIndex(solution, i, " ");
    }
  }

  for (let i = 0; i < solution.length; i++) {
    if (tileStates[i] === "correct") {
      continue;
    }
    console.log(solution, guess[i])
    if (solution.includes(guess[i])) {
      tileStates[i] = "wrong-place";
      solution = replaceCharAtIndex(solution, solution.indexOf(guess[i]), " ");
    } else {
      tileStates[i] = "wrong";
    }
  }

  return tileStates
};

type Props = {
  guess: string | undefined;
  solution: string;
  isSubmitted: boolean;
};

export const GuessRow = ({ guess, isSubmitted, solution }: Props) => {
  const tileStates = getTileStates(solution, guess, isSubmitted);
  return (
    <div className="flex gap-2">
      {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => {

        return (
          <Tile
            key={idx}
            letter={guess ? guess[idx] : ""}
            state={tileStates[idx]}
          />
        );
      })}
    </div>
  );
};

type TileState = "unsubmitted" | "correct" | "wrong" | "wrong-place";

type TileProps = {
  letter: string | undefined;
  state: TileState;
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
