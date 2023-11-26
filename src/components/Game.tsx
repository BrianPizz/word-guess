import { useCallback, useEffect, useState } from "react";
import { GAME_ROUNDS, BACKSPACE, ENTER } from "../constants";
import { GuessRow } from "./GuessRow";
import { Keyboard } from "./Keyboard";
import { useCurrentGuessReducer } from "./useCurrentGuessReducer";

export const Game = () => {
  const [currentGuess, dispatch] = useCurrentGuessReducer();
  const [guesses, setGuesses] = useState<Array<string>>([])

  const onKeyPress = useCallback(
    (key: string) => {
      console.log(key);

      if (key === BACKSPACE){
        dispatch({type: 'backspace'})
        return;
      }

      if (key === ENTER){
        // TODO submit
        
        return
      }
      if (key.length !== 1 || !/[a-z]|[A_Z]/.test(key)){
        return
      }
      dispatch({type: 'add', letter: key.toUpperCase() })
    },
    [dispatch]
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

  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-h-[700px] w-full max-w-lg flex flex-col items-center py-8 justify-between">
        <div className="flex flex-col gap-2">
          {Array.from({ length: GAME_ROUNDS }).map((_, idx) => {
            return <GuessRow key={idx} guess={idx === 0 ? currentGuess : ''} />;
          })}
        </div>
        <Keyboard onKeyPress={onKeyPress} />
      </div>
    </div>
  );
};
