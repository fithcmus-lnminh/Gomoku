export type CellType = "X" | "O" | null;
export type BoardState = { row: number; col: number };

export type BoardProps = {
  boardState: CellType[];
  cellsWin: number[] | null;
  size: number;
  onCellClicked: (idx: number) => void;
};

export type CellProps = {
  boardState: CellType[];
  row: number;
  col: number;
  boardSize: number;
  onCellClicked: (idx: number) => void;
  isCellWin: (idx: number) => boolean;
};

export type MoveHistory = { row: number; col: number } | null;
