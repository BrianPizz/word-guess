import classNames from "classnames";
import { ENTER, BACKSPACE } from "../constants";

const ROWS = [
  "QWERTYUIOP".split(""),
  " ASDFGHJKL ".split(""),
  [ENTER, ..."ZXCVBNM".split(""), BACKSPACE],
];

type Props = {
  onKeyPress: (key: string) => void;
};

export const Keyboard = ({ onKeyPress }: Props) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {ROWS.map((letters, idx) => {
        return (
          <div className="flex w-full gap-1" key={idx}>
            {letters.map((letter, idx) => {
              return <Key key={idx} letter={letter} onKeyPress={onKeyPress} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

type KeyProps = {
  letter: string;
  onKeyPress: (key: string) => void;
};

export const Key = ({ letter, onKeyPress }: KeyProps) => {
  if (letter === " ") {
    return <div className="flex-[0.5]"></div>;
  }
  return (
    <button
      className={classNames(
        {
          ["flex-1"]: letter !== ENTER && letter !== BACKSPACE,
          ["flex-[2]"]: letter === ENTER || letter === BACKSPACE,
        },
        "bg-gray-500 rounded-md flex-1 h-14 font-bold text-lg justify-center items-center flex active:bg-slate-400"
      )}
      onClick={() => onKeyPress(letter)}
    >
      {letter === BACKSPACE ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          data-testid="icon-backspace"
          fill="white"
        >
          <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
        </svg>
      ) : (
        letter
      )}
    </button>
  );
};
