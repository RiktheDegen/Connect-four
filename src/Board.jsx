// src/Board.js
import React, { useState } from 'react';
import Cell from './Cell';

const ROWS = 6;
const COLS = 7;
const WIN_LENGTH = 4;

function Board() {
  const [grid, setGrid] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
  const [isRedNext, setIsRedNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleCellClick = (col) => {
    if (winner) return; // Stop if there's already a winner
    for (let row = ROWS - 1; row >= 0; row--) {
      if (grid[row][col] === null) {
        const newGrid = grid.map((r, rowIndex) =>
          rowIndex === row ? [...r.slice(0, col), isRedNext ? 'R' : 'Y', ...r.slice(col + 1)] : r
        );
        setGrid(newGrid);
        setIsRedNext(!isRedNext);

        if (checkWin(newGrid, row, col)) {
          setWinner(isRedNext ? 'Red' : 'Yellow');
        }

        return;
      }
    }
  };

  const checkWin = (grid, row, col) => {
    const current = grid[row][col];
    return (
      checkDirection(grid, row, col, 0, 1, current) || // Horizontal
      checkDirection(grid, row, col, 1, 0, current) || // Vertical
      checkDirection(grid, row, col, 1, 1, current) || // Diagonal (down-right)
      checkDirection(grid, row, col, 1, -1, current)   // Diagonal (down-left)
    );
  };

  const checkDirection = (grid, row, col, rowDir, colDir, player) => {
    let count = 0;
    for (let d = -WIN_LENGTH + 1; d < WIN_LENGTH; d++) {
      const r = row + d * rowDir;
      const c = col + d * colDir;
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS && grid[r][c] === player) {
        count++;
        if (count === WIN_LENGTH) return true;
      } else {
        count = 0;
      }
    }
    return false;
  };

  const renderGrid = () =>
    grid.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center space-x-1 md:space-x-2 lg:space-x-3">
        {row.map((cell, colIndex) => (
          <Cell key={colIndex} value={cell} onClick={() => handleCellClick(colIndex)} />
        ))}
      </div>
    ));

  return (
    <div className="flex flex-col items-center space-y-2 mt-8">
      <div className="text-white text-lg font-bold mb-4">
        {winner ? `Winner: ${winner}` : `Next Player: ${isRedNext ? 'Red' : 'Yellow'}`}
      </div>
      <div className="space-y-1 mt-8 md:space-y-2 lg:space-y-3">
        {renderGrid()}
      </div>
    </div>
  );
}

export default Board;
