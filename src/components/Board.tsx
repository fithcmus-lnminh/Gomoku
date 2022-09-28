import Cell from "./Cell";
import { BoardProps } from "./type";

const Board = (props: BoardProps) => {
  const { boardState, cellsWin, size, onCellClicked } = props;

  const isCellWin = (idx: number): boolean => {
    if (cellsWin?.includes(idx)) return true;
    return false;
  };

  return (
    <div>
      {Array(size)
        .fill(null)
        .map((_, row) => (
          <div key={row} className="board__row">
            {Array(size)
              .fill(null)
              .map((_, col) => (
                <Cell
                  boardState={boardState}
                  boardSize={size}
                  row={row}
                  col={col}
                  onCellClicked={onCellClicked}
                  isCellWin={isCellWin}
                />
              ))}
          </div>
        ))}
    </div>
  );
};

export default Board;
