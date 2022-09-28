import React from "react";
import { CellProps } from "./type";

const Cell = (props: CellProps): JSX.Element => {
  const { boardState, row, col, boardSize, onCellClicked, isCellWin } = props;

  const idx = row * boardSize + col;

  return (
    <button
      className={`square ${isCellWin(idx) && "win"} ${boardState[idx]}`}
      onClick={() => {
        onCellClicked(idx);
      }}
    >
      {boardState[idx]}
    </button>
  );
};

export default Cell;
