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

import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

const options = {
  'no-help': {
    name: 'Manual',
    description: (
      <div>
        You are prevented from placing a queen in another’s path. The rest is up
        to you. <strong>Good luck!</strong>
      </div>
    ),
  },
  validation: {
    name: 'Validation',
    description: (
      <div>
        After you place a queen, her paths are blocked. Even so, it can be
        tricky to find a solution!
      </div>
    ),
  },
  configurator: {
    name: 'Configurator',
    description: (
      <div>
        The configurator blocks <em>all</em> squares that don't lead to a valid
        solution.
        <div>
          <strong>Puzzle solved, every time</strong>.
        </div>
      </div>
    ),
  },
};

function ModesSelect({ value, onSelect }) {
  const valueData = options[value];

  return (
    <div className="label-wrapper">
      <label>Game mode</label>
      <Wrapper className="select-wrapper" onSelection={onSelect}>
        <Button className="select">{valueData.name}</Button>
        <Menu className="options-menu">
          {Object.keys(options).map((v) => (
            <MenuItem
              value={v}
              className={`option${value === v ? ' selected' : ''}`}
              key="v"
            >
              <div className="option-name">{options[v].name}</div>
              <div className="option-description">{options[v].description}</div>
            </MenuItem>
          ))}
        </Menu>
      </Wrapper>
    </div>
  );
}

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
function Invalid({ width = '965', height = '835' }) {
  return (
    <svg version="1.1" viewBox="0 0 965 835" width={width} height={height}>
      <g transform="translate(-70 260) rotate(-35) scale(1.4)">
        <path
          fill="hsla(218, 96%, 10%, .5)"
          d="M562.121,259.312c-147.8,4.3-294.7,21.1-442.2,26c121.8-51.1,254-70.4,379.4-112.3c11.6-4,14.1-23.6,0-26
		c-118.6-21.4-234,27.8-351.8,23.9c72.8-32.4,153-46.2,227.1-76.5c12.2-5.2,11.9-25.4-3.399-24.8c-46.2,1.5-93.901,12.5-140.101,7.3
		c27.8-16.2,54.8-33.7,78.3-56.3c8.9-8.6-0.3-22.6-11.6-19.9c-22,4.9-48,9.2-62.4,27.5c-4.3,5.5-2.1,12.2,2.1,15.6
		c-15.6,9.5-31.5,18.7-47.7,27.5c-9.8,5.5-7,19.6,3.1,23c25.4,8.3,51.4,9.8,77.4,8.6c-59.7,17.7-119.6,34.3-174.1,65.8
		c-8.9,5.2-8.3,21.7,3.1,23.3c109.2,17.4,216.3-23.3,324.701-24.2c-127,35.2-257.301,57.8-375.201,120.9
		c-12.2,6.4-6.4,26.001,7,25.7c132.2-0.899,263.5-14.1,395.401-22c-49.301,13.801-98.801,26.301-148.4,37.601
		c-100.101,23-195.5,54.2-293.101,85.7c-14.4,4.6-12.5,28.199,3.7,27.199c79.3-4.6,155.8-24.199,233.5-37.899
		c81.4-14.4,170.4-23.9,254.601-27.2c-63.601,59.1-202,43.8-277.5,65.2c-13.5,3.7-13.5,23.3,0,27.2c30.9,8.899,61.2,10.1,92.1,9.5
		c-8.3,4-16.8,7-26,10.1c-5.8,1.8-10.4,7-10.4,13.5c0.6,19.6,2.4,38.9,4,58.4c1.5,18.1,29.7,18.1,28.2,0
		c-1.5-17.101-2.8-34.301-3.699-51.4c0.6,8.6,60.6-31.5,65.8-35.8c8.3-7.3,3.399-20.5-5.8-23.3
		c71-8.301,141.399-23.601,175.3-80.801c5.2-8.899-1.5-21.1-11.9-20.8c-82,1.8-164.3,15-246,23c-31.2,3.101-61.8,8.3-92.4,14.4
		c32.4-9.5,65.2-18.101,98.801-25.4c92.7-19.6,184.5-44.7,274.5-74.4C580.222,281.612,578.321,258.712,562.121,259.312z"
        />
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
  const [mode, setMode] = useState<CompletionMode>('configurator');

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

  function handleModeChange(newMode) {
    handleReset();
    setMode(newMode);
  }

  async function handlePlaceHintQueen() {
    const newQueens = toggleQueen(INITIAL_BOARD, new Map(), 4, 0);
    const newBoard = await placeQueens(newQueens, 'configurator');

    setUserQueens(newQueens);
    setBoard(newBoard);
    setMode('configurator');
  }

  return (
    <div className="App">
      <Welcome />
      <div className="board-and-hints">
        <div className="menu-board-progress">
          <div className="menu">
            <ModesSelect
              onSelect={(value, e) => {
                handleModeChange(value);
              }}
              value={mode}
            />
            <button className="button" onClick={handleReset}>
              Start Over
            </button>
          </div>
          <div className="board">
            <ColumnNames />
            {board.map((rv, col) => (
              <React.Fragment key={col}>
                <div className="board-label" key={`start_label_${col}`}>
                  {col + 1}
                </div>
                <div className="row">
                  {rv.map((cv, row) => (
                    <Piece
                      key={`${col}_${row}`}
                      onClick={() => handleClick(col, row)}
                      value={board[col][row]}
                      mode={mode}
                    />
                  ))}
                </div>
                <div className="board-label" key={`end_label_${col}`}>
                  {col + 1}
                </div>
              </React.Fragment>
            ))}
            <ColumnNames />
          </div>
          <Progress
            user={userQueens.size}
            rule={countQueensPlacedByRules(board)}
          />
        </div>
        <Hints onPlaceQueen={handlePlaceHintQueen} />
      </div>
      <Footer />
    </div>
  );
}

function ColumnNames() {
  return (
    <>
      <div className="board-label"></div>
      <div className="board-label">A</div>
      <div className="board-label">B</div>
      <div className="board-label">C</div>
      <div className="board-label">D</div>
      <div className="board-label">E</div>
      <div className="board-label">F</div>
      <div className="board-label">G</div>
      <div className="board-label">H</div>
      <div className="board-label"></div>
    </>
  );
}

function Progress({ user, rule }) {
  return (
    <div className="progress">
      {Array.from({ length: 8 }, (_, i) => i).map((i) =>
        i < user ? (
          <Queen width="40" height="32" key={i} />
        ) : i < user + rule ? (
          <Queen width="40" height="32" opacity={0.5} key={i} />
        ) : (
          <Queen width="40" height="32" outline opacity={0.5} key={i} />
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
        <Invalid width="100%" height="100%" />
      ) : (
        ''
      )}
    </button>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        For details on this classic puzzle, go to{' '}
        <a
          href="https://en.wikipedia.org/wiki/Eight_queens_puzzle"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://en.wikipedia.org/wiki/Eight_queens_puzzle
        </a>
      </div>
      <div>
        <a href="https://www.configit.com">Configit A/S</a> - 2020
      </div>
    </footer>
  );
}

function Welcome() {
  return (
    <div className="welcome">
      <h1>Eight queens game</h1>
      <p className="lead">
        In this game, your goal is to place eight queens on the chessboard
        without any of the queens capturing each other.
      </p>
    </div>
  );
}

function Hints({ onPlaceQueen }) {
  return (
    <div className="hints">
      <h2>You might be surprised…</h2>
      <p>
        <button className="button" onClick={onPlaceQueen}>
          Place a <Queen width="20" height="12" /> on A5
        </button>
      </p>
      <p>
        In Configurator mode, E6 becomes blocked! That’s because{' '}
        <strong>Configit’s Virtual Tabulation®</strong> configuration engine{' '}
        knows there are no solutions with queens on both A5 and E6. Even though
        it may look possible, no matter where you place the remaining queens,
        you will reach a dead end.
      </p>
      <p>
        This demonstrates the power of using Configit’s VT technology.{' '}
        <strong>
          No more false leads, backtracking, or incompatible choices
        </strong>{' '}
        — you are guided to a valid solution, every time.
      </p>

      <p className="call-to-action">
        <a
          href="https://www.configit.com/solution-space"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more about Virtual Tabulation®
        </a>
      </p>
    </div>
  );
}
