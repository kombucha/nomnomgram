import * as React from "react";

import Grid, { Position, Guide } from "./Grid";
import ColorPicker from "./ColorPicker";
import { generateGuide } from "./Grid/utils";
import "./App.css";

interface State {
  drawing: number[][];
  colors: string[];
  currentColorIdx: number;
  guide: Guide;
}

class App extends React.PureComponent<object, State> {
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

    this.state = { drawing, colors, guide, currentColorIdx: 0 };
  }

  render() {
    const { colors, drawing, guide, currentColorIdx } = this.state;

    return (
      <div className="App">
        <Grid colors={colors} grid={drawing} guide={guide} onToggleCell={this.handleCellToggling} />
        <ColorPicker
          colors={colors}
          selectedColor={colors[currentColorIdx]}
          onColorSelected={this.handleColorSelected}
        />
      </div>
    );
  }

  private handleColorSelected = (color: string) => {
    const currentColorIdx = this.state.colors.indexOf(color);
    this.setState({ currentColorIdx });
  };

  private handleCellToggling = (p: Position) => {
    const { drawing, colors, currentColorIdx } = this.state;
    const cellColor = drawing[p.y][p.x];

    const updatedDrawing = drawing.reduce<number[][]>((acc, row, index) => {
      if (index === p.y) {
        const updatedRow = row.slice();
        updatedRow[p.x] = currentColorIdx;
        acc.push(updatedRow);
      } else {
        acc.push(row);
      }
      return acc;
    }, []);
    const updatedGuide = generateGuide(updatedDrawing, colors.length);

    this.setState({ drawing: updatedDrawing, guide: updatedGuide });
  };
}

export default App;
