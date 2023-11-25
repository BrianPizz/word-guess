const ROWS = [
  "QWERTYUIOP".split(""),
  "ASDFGHJKL".split(""),
  ["Enter", ..."ZXCVBNM".split(""), "Backspace"],
];

type Props = {
  onKeyPress: (key: string) => void;
};

export const Keyboard = ({ onKeyPress }: Props) => {
  return (
    <div>
      {ROWS.map((letters, idx) => {
        return (
          <div key={idx}>
            {letters.map((letter) => {
              return (
                <Key key={letter} letter={letter} onKeyPress={onKeyPress} />
              );
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
  return <button onClick={() => onKeyPress(letter)}>{letter}</button>;
};
