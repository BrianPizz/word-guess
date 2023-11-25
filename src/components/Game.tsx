import { GAME_ROUNDS } from "../constants";
import { GuessRow } from "./GuessRow";
import { Keyboard } from "./Keyboard";

export const Game = () => {
    const onKeyPress = (key: string) => {
        console.log(key)
    }
  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-h-[700px] w-full max-w-xl flex flex-col items-center py-8 justify-between">
        <div className="flex flex-col gap-2">
        {Array.from({ length: GAME_ROUNDS }).map((_, idx) => {
          return <GuessRow key={idx} letters="" />;
        })}
        </div>
        <Keyboard onKeyPress={onKeyPress}/>
      </div>
    </div>
  );
};
