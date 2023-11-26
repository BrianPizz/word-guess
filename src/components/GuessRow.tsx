import { GAME_WORD_LEN } from "../constants";

type Props = { guess: string };

export const GuessRow = ({ guess }: Props) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => {
        return <Tile key={idx} letter={guess[idx]} />;
      })}
    </div>
  );
};

type TileProps = {
  letter: string | undefined;
};

export const Tile = ({ letter }: TileProps) => {
  return <div className="border border-gray-500 w-16 h-16 flex justify-center items-center text-3xl font-bold">{letter}</div>;
};
