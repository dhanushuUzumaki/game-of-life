/* global alert */
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Grid from './grid';
import Input from './Input';

const getGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.floor(Math.random(2) * 10) % 2;
    }
  }
  return grid;
};

const getNeighbourCount = (grid, x, y, rows, cols) => {
  let count = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const row = (rows + x + i) % rows;
      const col = (cols + y + j) % cols;
      count += grid[row][col];
    }
  }
  count -= grid[x][y];
  return count;
};

const getNextGeneration = (oldGeneration, rows, cols) => {
  const newGeneration = [];
  for (let i = 0; i < rows; i++) {
    newGeneration[i] = [];
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const state = oldGeneration[i][j];
      const neighbours = getNeighbourCount(oldGeneration, i, j, rows, cols);

      if (neighbours < 2 || neighbours > 3) {
        newGeneration[i][j] = 0;
      } else if (neighbours === 3) {
        newGeneration[i][j] = 1;
      } else {
        newGeneration[i][j] = state;
      }
    }
  }

  return newGeneration;
};

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      grid: getGrid(30, 30),
      rows: 30,
      cols: 30,
      cellSize: 12,
      running: undefined,
      generations: 0,
      speed: 100
    };
    this.onCellClick = (row, col) => this._onCellClick(row, col);
    this.clearGrid = () => this._clearGrid();
    this.changeBoard = () => this._changeBoard();
    this.startRunning = () => this._startRunning();
    this.live = () => this._live();
    this.stopRunning = () => this._stopRunning();
  }

  _live () {
    const { rows, cols, grid, generations } = this.state;
    const newGeneration = getNextGeneration(grid, rows, cols);
    this.setState({
      grid: newGeneration,
      generations: generations + 1
    });
  }

  _startRunning () {
    if (this.state.running === undefined) {
      const running = setInterval(this.live, this.state.speed);
      this.setState({
        running
      });
    }
  }

  _stopRunning () {
    const { running } = this.state;
    if (running !== undefined) {
      clearInterval(running);
      this.setState({
        running: undefined
      });
    }
  }

  _changeBoard () {
    let rows = this.rowsInput.getValue();
    let cols = this.colsInput.getValue();
    let speed = this.speedInput.getValue();

    if (rows.length < 1 || cols.length < 1 || speed.length < 1) {
      alert('Enter values');
    }

    rows = parseInt(rows, 10);
    cols = parseInt(cols, 10);
    speed = parseInt(speed, 10);

    if (rows > 100 || rows < 10 || cols > 100 || cols < 10) {
      alert('Min and Max values for rows and cols are 10 and 100 respectively');
      return;
    }
    const state = Object.assign(JSON.parse(JSON.stringify(this.state)), {
      rows, cols, speed
    });
    state.grid = getGrid(rows, cols);
    state.running = undefined;
    state.generations = 0;
    if (this.state.running !== undefined) {
      clearInterval(this.state.running);
    }
    this.setState(state);
  }

  _clearGrid () {
    const { grid, rows, cols, running } = this.state;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = 0;
      }
    }
    if (running !== undefined) {
      clearInterval(running);
    }
    this.setState({ grid, running: undefined, generations: 0 });
  }

  _onCellClick (row, col) {
    const grid = JSON.parse(JSON.stringify(this.state.grid));
    const currState = grid[row][col];
    grid[row][col] = currState === 0 ? 1 : 0;
    this.setState({
      grid
    });
  }

  render () {
    const { rows, cols, grid, cellSize, generations, speed } = this.state;
    return (
      <div>
        <Header />
        <div className="controls">
          <div className="inputs">
            <Input
              type="number"
              placeholder="Rows"
              identifier="rowInput"
              value={rows}
              label="Rows"
              title="Min: 10 Max: 100"
              ref={comp => this.rowsInput = comp}
            />
            <Input
              type="number"
              placeholder="Cols"
              identifier="colInput"
              value={cols}
              label="Cols"
              title="Min: 10 Max: 100"
              ref={comp => this.colsInput = comp}
            />
            <Input
              type="number"
              placeholder="Speed"
              identifier="speed"
              value={speed}
              label="Speed"
              title="In MilliSeconds"
              ref={comp => this.speedInput = comp}
            />
            <button
              className="btn btn-primary ripple set-board"
              onClick={this.changeBoard}
            >
              Set Board
            </button>
          </div>
          <div className="btns">
            <button className="btn btn-primary ripple" onClick={this.startRunning}>Run</button>
            <button className="btn btn-primary ripple" onClick={this.stopRunning}>Pause</button>
            <button className="btn btn-primary ripple" onClick={this.clearGrid}>Clear</button>
            Generations: {generations}
          </div>
        </div>
        <Grid
          rows={rows}
          cols={cols}
          grid={grid}
          onCellClick={this.onCellClick}
          cellSize={cellSize}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
