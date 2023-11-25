import { GAME_ROUNDS } from "../constants";
import { GuessRow } from "./GuessRow";

export const Game = () => {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-full max-w-xl flex flex-col items-center py-8 gap-2">
        {Array.from({ length: GAME_ROUNDS }).map((_, idx) => {
          return <GuessRow key={idx} letters="" />;
        })}
      </div>
    </div>
  );
};
