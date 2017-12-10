import * as React from "react";

import ColorPicker from "../../common/ColorPicker";
import Grid from "../../common/Grid";
import { generateGuide } from "../../common/Grid/utils";
import { IGrid, IGuide, IPosition } from "../../models";

import "./Edit.css";

interface IState {
  grid: IGrid;
  currentColorIdx: number;
}

class Edit extends React.PureComponent<object, IState> {
  constructor(props: object) {
    super(props);
    const drawing = [
      [2, 2, 0, 2, 2],
      [3, 2, 2, 2, 3],
      [0, 1, 2, 1, 0],
      [0, 2, 2, 2, 0],
      [0, 2, 1, 2, 0],
    ];
    const colors = ["#fff", "#000", "#b7b7b7", "#ffa3f5"];
    const guide = generateGuide(drawing, colors.length);

    // Default grid
    const grid = {
      name: "",
      author: "",
      drawing,
      colors,
      guide,
    };

    this.state = { grid, currentColorIdx: 0 };
  }

  public render() {
    const { grid, currentColorIdx } = this.state;
    const selectedColor = grid.colors[currentColorIdx];

    return (
      <div className="Edit">
        <Grid grid={grid} showGuide={true} onToggleCell={this.handleCellEdit} />
        <ColorPicker
          colors={grid.colors}
          selectedColor={selectedColor}
          onColorSelected={this.handleColorSelected}
        />
      </div>
    );
  }

  private handleColorSelected = (color: string) => {
    const currentColorIdx = this.state.grid.colors.indexOf(color);
    this.setState({ currentColorIdx });
  };

  private handleCellEdit = (p: IPosition) => {
    const { grid, currentColorIdx } = this.state;
    const cellColor = grid.drawing[p.y][p.x];

    const drawing = grid.drawing.reduce<number[][]>((acc, row, index) => {
      if (index === p.y) {
        const updatedRow = row.slice();
        updatedRow[p.x] = currentColorIdx;
        acc.push(updatedRow);
      } else {
        acc.push(row);
      }
      return acc;
    }, []);
    const guide = generateGuide(drawing, grid.colors.length);

    const updatedGrid = { ...grid, drawing, guide };

    this.setState({ grid: updatedGrid });
  };
}

export default Edit;
