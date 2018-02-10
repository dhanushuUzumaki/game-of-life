import React from 'react';

const getData = (props) => {
  const { rows, cols, grid, onCellClick, cellSize } = props;
  const width = cols * (cellSize + 2);
  const height = rows * (cellSize + 2);

  return {
    rows,
    cols,
    width,
    height,
    cellSize,
    grid,
    onCellClick
  };
};

const getCoordinates = ({ row, col, cellSize }) => {
  const x = (col * (cellSize + 2)) + 2;
  const y = (row * (cellSize + 2)) + 2;
  return {
    x, y
  };
};

const Grid = (props) => {
  const { rows, cols, width, height, cellSize, grid, onCellClick } = getData(props);
  return (
    <svg width={width + 2} height={height + 2}>
      <rect x="0" y="0" width={width + 2} height={height + 2} fill="#585f60" stroke="#060f10" />
      {
        (() => {
          const rects = [];
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              const fillColor = grid[i][j] === 0 ? '#585f60' : '#ffcc54';
              const coordinates = getCoordinates({ row: i, col: j, cellSize });
              rects.push(<rect
                width={cellSize}
                height={cellSize}
                x={coordinates.x}
                y={coordinates.y}
                fill={fillColor}
                key={`${i}-${j}`}
                onClick={() => onCellClick(i, j)}
                className="pointer"
                stroke="black"
              />);
            }
          }
          return rects;
        })()
      }
    </svg>
  );
};

export default Grid;
