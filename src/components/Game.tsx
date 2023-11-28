import { useCallback, useEffect, useState } from "react";
import {
  GAME_ROUNDS,
  BACKSPACE,
  ENTER,
  GAME_WORD_LEN,
  LetterState,
} from "../constants";
import { GuessRow } from "./GuessRow";
import { Keyboard } from "./Keyboard";
import { useCurrentGuessReducer } from "./useCurrentGuessReducer";
import { isValidWord } from "./isValidWord";
import { getTileStates } from "./getTileStates";

type Props = {
  solution: string;
};

export const Game = ({ solution }: Props) => {
  const [currentGuess, dispatch] = useCurrentGuessReducer();
  const [guesses, setGuesses] = useState<Array<string>>([]);

  const onKeyPress = useCallback(
    (key: string) => {
      if (key === BACKSPACE) {
        dispatch({ type: "backspace" });
        return;
      }

      if (key === ENTER) {
        if (currentGuess.length !== GAME_WORD_LEN) {
          // TODO not enough letters
          return;
        }
        if (!isValidWord(currentGuess)) {
          // TODO shake text
          console.log("not a valid word!");
          return;
        }
        setGuesses([...guesses, currentGuess]);
        dispatch({ type: "clear" });
        // TODO submit
        return;
      }
      if (key.length !== 1 || !/[a-z]|[A_Z]/.test(key)) {
        return;
      }
      dispatch({ type: "add", letter: key.toUpperCase() });
    },
    [dispatch, currentGuess, guesses]
  );

  const onKeyDownEvt = useCallback(
    (evt: KeyboardEvent) => {
      onKeyPress(evt.key);
    },
    [onKeyPress]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownEvt);
    return () => window.removeEventListener("keydown", onKeyDownEvt);
  }, [onKeyDownEvt]);

  const guessIdxToTileStates = Array.from({ length: GAME_ROUNDS }).map(
    (_, idx) => {
      const isSubmitted = idx < guesses.length;
      return getTileStates(solution, guesses[idx], isSubmitted);
    }
  );

  const letterToLetterState: { [letter: string]: LetterState } = {};
  guessIdxToTileStates.forEach((tileStates, idx) => {
    const guess = guesses[idx];
    if (!guess) {
      return;
    }
    tileStates.forEach((tileState, letterIdx) => {
      const letter = guess[letterIdx];
      if (tileState === "correct" || letterToLetterState[letter] === "correct") {
        letterToLetterState[letterIdx] = "correct";
        return;
      }
      if (
        tileState === "wrong-place" ||
        letterToLetterState[letter] === "wrong-place"
      ) {
        letterToLetterState[letterIdx] = "wrong-place";
        return;
      }
      if (tileState === 'wrong') {
        letterToLetterState[letter] = 'wrong'
      }
    });
  });

  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-h-[700px] w-full max-w-lg flex flex-col items-center py-8 justify-between">
        <div className="flex flex-col gap-2">
          {Array.from({ length: GAME_ROUNDS }).map((_, idx) => {
            const isSubmitted = idx < guesses.length;
            return (
              <GuessRow
                key={idx}
                guess={idx === guesses.length ? currentGuess : guesses[idx]}
                letterStates={guessIdxToTileStates[idx]}
              />
            );
          })}
        </div>
        <Keyboard
          onKeyPress={onKeyPress}
          letterToLetterState={letterToLetterState}
        />
      </div>
    </div>
  );
};
