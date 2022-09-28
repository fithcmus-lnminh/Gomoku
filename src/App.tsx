import React, { useState } from "react";
import Board from "./components/Board";
import { CellType, MoveHistory } from "./components/type";
import { findWinner } from "./utils";

function App() {
  const [boardSize, setBoardSize] = useState<number>(10);
  const [numCellWin, setNumCellWin] = useState<number>(3);
  const [moveHistory, setMoveHistory] = React.useState<MoveHistory[]>([null]);
  const [boardState, setBoardState] = React.useState<CellType[][]>([
    Array(9).fill(null),
  ]);
  const [numStep, setNumStep] = React.useState<number>(0);
  const [isXTurn, setIsXTurn] = React.useState<boolean>(true);
  const [winner, setWinner] = React.useState<CellType>(null);
  const [cellsWin, setCellsWin] = React.useState<number[] | null>(null);
  const [isSortAsc, setSortAsc] = React.useState<boolean>(true);

  const handleChangeBoardSize = (e: any) => {
    setBoardSize(+e.target.value);
    resetBoard();
  };

  const handleChangeNumCellWin = (e: any) => {
    setNumCellWin(+e.target.value);
    resetBoard();
  };

  const handleCellClicked = (idx: number) => {
    const newMoveHistory = moveHistory.slice(0, numStep + 1);
    const history = boardState.slice(0, numStep + 1);
    const squares = history[history.length - 1].slice();

    if (squares[idx] || winner) return;
    squares[idx] = isXTurn ? "X" : "O";

    const winInfo = findWinner(squares, boardSize, numCellWin);
    if (winInfo) {
      setWinner(winInfo[0]);
      setCellsWin(winInfo[1]);
    }

    setMoveHistory([
      ...newMoveHistory,
      { row: Math.floor(idx / boardSize), col: idx % boardSize },
    ]);
    setBoardState([...history, [...squares]]);
    setNumStep(history.length);
    setIsXTurn(!isXTurn);
  };

  const resetBoard = () => {
    setMoveHistory([null]);
    setBoardState([Array(9).fill(null)]);
    setNumStep(0);
    setIsXTurn(true);
    setWinner(null);
    setCellsWin(null);
    setSortAsc(true);
  };

  const getMovesHistoryIndex = (isAsc: boolean) => {
    const res = Array(moveHistory.length)
      .fill(null)
      .map((_, idx) => idx);
    return isAsc ? res : res.reverse();
  };

  const getStatus = (): JSX.Element => {
    if (winner) return <p className={`status ${winner}`}>{winner} WIN!!!</p>;
    if (numStep === Math.pow(boardSize, 2)) return <h4>DRAW</h4>;
    return (
      <p className={`status ${isXTurn ? "X" : "O"}`}>
        CURRENT: {isXTurn ? "X" : "O"}
      </p>
    );
  };

  const goToHistory = (step: number): void => {
    setNumStep(step);
    setIsXTurn(step % 2 === 0);
    const winInfo = findWinner(boardState[step], boardSize, numCellWin);
    if (winInfo) {
      setWinner(winInfo[0]);
      setCellsWin(winInfo[1]);
    } else {
      setWinner(null);
      setCellsWin(null);
    }
  };

  return (
    <div className="container">
      <div className="settings">
        <h3>SETTINGS:</h3>
        <hr></hr>
        <div className="board__size">
          <p>Size: {boardSize}</p>
          <input
            type="range"
            min={3}
            max={15}
            value={boardSize}
            onChange={handleChangeBoardSize}
          />
        </div>
        <div className="board__size">
          <p>Number of square to win: {numCellWin}</p>
          <input
            type="range"
            min={3}
            max={5}
            value={numCellWin}
            onChange={handleChangeNumCellWin}
          />
        </div>
        <div>
          <h3 style={{ margin: "24px 0 8px 0" }}>MOVES HISTORY</h3>
          <button
            className="btn__history btn__action"
            onClick={() => setSortAsc(!isSortAsc)}
          >
            Sort: {isSortAsc ? "DESC" : "ASC"}
          </button>
          <button
            className="btn__history btn__action"
            onClick={() => resetBoard()}
          >
            Reset
          </button>
          <hr></hr>
          {getMovesHistoryIndex(isSortAsc).map((index) => {
            return (
              <div key={index}>
                <button
                  className={`btn__history ${index % 2 === 0 ? "X" : "O"} ${
                    index === numStep && "btn__active"
                  }`}
                  onClick={() => goToHistory(index)}
                >
                  {index === 0
                    ? "Game start"
                    : `Step #${index}: (${moveHistory[index]?.col}, ${moveHistory[index]?.row})`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="board__main">
        {getStatus()}
        <Board
          boardState={boardState[numStep]}
          size={boardSize}
          cellsWin={cellsWin}
          onCellClicked={handleCellClicked}
        />
      </div>
    </div>
  );
}

export default App;
