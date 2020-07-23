import React, { useState } from 'react';
import './styles.css';
import {
  INITIAL_BOARD,
  INITIAL_QUEENS,
  CellType,
  CompletionMode,
  toggleQueen,
  makeBoard as placeQueens,
} from './board';

function Queen({ width = '64', height = '64', opacity = 1, outline = false }) {
  return (
    <svg
      version="1.1"
      viewBox="0 0 64 64"
      width={width}
      height={height}
      opacity={opacity}
    >
      <g transform="matrix(4.571428571428571,0,0,4.571428571428571,0,0)">
        <path
          d="M13.691,4.031a.5.5,0,0,0-.545.109L10.779,6.508a.25.25,0,0,1-.2.072.246.246,0,0,1-.183-.106L7.41,2.207a.519.519,0,0,0-.82,0L3.6,6.474a.246.246,0,0,1-.183.106.25.25,0,0,1-.2-.072L.854,4.14A.5.5,0,0,0,0,4.493v7a.5.5,0,0,0,.5.5h13a.5.5,0,0,0,.5-.5v-7A.5.5,0,0,0,13.691,4.031Z"
          fill={outline ? 'none' : 'currentColor'}
          stroke={outline ? 'currentColor' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={outline ? 1 : '0'}
        />
      </g>
    </svg>
  );
}

function Invalid({ width = '64', height = '64' }) {
  return (
    <svg version="1.1" viewBox="0 0 64 64" width={width} height={height}>
      <g transform="matrix(2.6666666666666665,0,0,2.6666666666666665,0,0)">
        <path
          d="M23.5 0.5L0.5 23.5"
          fill="none"
          stroke="hsl(4, 80%, 35%)"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeWidth="2px"
        ></path>
        <path
          d="M23.5 23.5L0.5 0.5"
          fill="none"
          stroke="hsl(4, 80%, 35%)"
          strokeLinecap="butt"
          strokeLinejoin="round"
          strokeWidth="2px"
        ></path>
      </g>
    </svg>
  );
}

function countQueensPlacedByRules(board) {
  let count = 0;
  board.forEach((col) => {
    count += col.filter((cell) => cell === CellType.Rule).length;
  });
  return count;
}

export default function App() {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [userQueens, setUserQueens] = useState(INITIAL_QUEENS);
  const [mode, setMode] = useState<CompletionMode>('no-help');

  async function handleClick(col: number, row: number) {
    const cell = board[col][row];
    if (cell === CellType.Incompatible) {
      return;
    }
    const newQueens = toggleQueen(board, userQueens, col, row);
    const newBoard = await placeQueens(newQueens, mode);

    setUserQueens(newQueens);
    setBoard(newBoard);
  }

  function handleReset() {
    setUserQueens(INITIAL_QUEENS);
    setBoard(INITIAL_BOARD);
  }

  async function handleModeChange(e) {
    const newMode = e.target.value;
    setMode(newMode);
    const newBoard = await placeQueens(userQueens, newMode);

    setBoard(newBoard);
  }

  return (
    <div className="App">
      <div className="menu">
        <Progress
          user={userQueens.size}
          rule={countQueensPlacedByRules(board)}
        />
        <select className="select" onChange={handleModeChange}>
          <option value="no-help">No help</option>
          <option value="validation">Validation</option>
          <option value="configurator">Use configurator</option>
        </select>
        <button className="button" onClick={handleReset}>
          Start Over
        </button>
      </div>
      <div className="board">
        {board.map((rv, col) => (
          <div key={col} className="row">
            {rv.map((cv, row) => (
              <Piece
                key={`${col}_${row}`}
                onClick={() => handleClick(col, row)}
                value={board[col][row]}
                mode={mode}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Progress({ user, rule }) {
  return (
    <div className="progress">
      {Array.from({ length: 8 }, (_, i) => i).map((i) =>
        i < user ? (
          <Queen width="32" height="24" key={i} />
        ) : i < user + rule ? (
          <Queen width="32" height="24" opacity={0.5} key={i} />
        ) : (
          <Queen width="32" height="24" outline opacity={0.5} key={i} />
        )
      )}
    </div>
  );
}

function Piece({ onClick, value, mode }) {
  return (
    <button onClick={onClick} className="col">
      {value === CellType.User ? (
        <Queen width="50%" height="50%" />
      ) : value === CellType.Rule ? (
        <Queen width="50%" height="50%" opacity={0.4} />
      ) : value === CellType.Incompatible && mode !== 'no-help' ? (
        <Invalid width="60%" height="70%" />
      ) : (
        ''
      )}
    </button>
  );
}
