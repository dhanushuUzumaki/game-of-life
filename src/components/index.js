/* eslint-disable */
import React from 'react';

const width = 400;
const height = 400;

class App extends React.Component {
  render () {
    const rows = 400 / 40;
    const cols = 400 / 40;

    let grid = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
    };

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = Math.floor(Math.random(2)*10)%2
      }
    }

    console.log(grid);

    return (
      <div>
        <svg width={width} height={height}>
          <rect x="0" y="0" width={width} height={height} fill="white" stroke="black" />
          {
            (() => {
              let rects = [];
              for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                  let fillColor = grid[i][j] === 0 ? "white" : "black";
                  rects.push(
                    <rect
                      width={(height/cols)-2}
                      height={(width/rows)-2}
                      x={(j*(width/rows))+1}
                      y={(i*(height/cols))+1}
                      fill={fillColor}
                      onClick={e => console.log(i,j)}
                      onTouchEnd={e => alert(`${i}, ${j}`)}
                    />
                  )
                }
              }
              return rects;
            })()
          }
        </svg>
      </div>
    )
  }
}

export default App;
