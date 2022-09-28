import { CellType } from "./../components/type";

const allEqual = (arr: any[]): boolean => {
  if (arr.length === 0) return false;
  return arr.every((v) => v === arr[0]);
};

export const findWinner = (
  boardState: CellType[],
  boardSize: number,
  numCellWin: number
): [CellType, number[]] | null => {
  const temp = Array(numCellWin).fill(null);
  for (let i = 0; i < boardState.length; i++) {
    if (!boardState[i]) continue;
    const row = temp.map((_, index) => boardState[i + index]);
    const rowNumbers = temp.map((_, index) =>
      Math.floor((i + index) / boardSize)
    );
    if (allEqual(rowNumbers) && allEqual(row))
      return [row[0], temp.map((_, index) => i + index)];

    const col = temp.map(
      (_, index) => boardState[i + index * boardSize]
    );
    if (allEqual(col))
      return [col[0], temp.map((_, index) => i + index * boardSize)];

    const diagonalLeft = temp.map(
      (_, index) => boardState[i + index * (boardSize + 1)]
    );
    if (allEqual(diagonalLeft))
      return [
        diagonalLeft[0],
        temp.map((_, index) => i + index * (boardSize + 1)),
      ];

    const diagonalRight = temp.map(
      (_, index) => boardState[i + index * (boardSize - 1)]
    );
    if (i % boardSize >= numCellWin - 1 && allEqual(diagonalRight))
      return [
        diagonalRight[0],
        temp.map((_, index) => i + index * (boardSize - 1)),
      ];
  }
  return null;
};
