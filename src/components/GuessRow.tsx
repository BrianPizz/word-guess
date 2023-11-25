import { GAME_WORD_LEN } from "../constants";

type Props = { letters: string };

export const GuessRow = ({ letters }: Props) => {
  return (
    <div className="flex gap-2">
      {Array.from({ length: GAME_WORD_LEN }).map((_, idx) => {
        return <Tile key={idx} letter={undefined} />;
      })}
    </div>
  );
};

type TileProps = {
  letter: string | undefined;
};

export const Tile = ({ letter }: TileProps) => {
  return <div className="border border-gray-500 w-16 h-16">{letter}</div>;
};
