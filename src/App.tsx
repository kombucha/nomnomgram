import * as React from "react";

import Grid, { Position, Guide } from "./Grid";
import { generateGuide } from "./Grid/utils";
import "./App.css";

interface State {
  drawing: number[][];
  colors: string[];
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

    this.state = { drawing, colors, guide };
  }

  render() {
    const { colors, drawing, guide } = this.state;

    return (
      <div className="App">
        <Grid
          colors={colors}
          grid={drawing}
          guides={guide}
          onToggleCell={this.handleCellToggling}
        />
      </div>
    );
  }

  private handleCellToggling = (p: Position) => {
    const { drawing, colors } = this.state;
    const cellColor = drawing[p.y][p.x];

    const updatedDrawing = drawing.reduce((acc: number[][], row: number[], index) => {
      if (index === p.y) {
        const updatedRow = row.slice();
        updatedRow[p.x] = 3;
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
