import * as React from "react";

import Grid from "./Grid";
import { generateGuide } from "./Grid/utils";
import "./App.css";

// Mouse
const drawing = [
  [2, 2, 0, 2, 2],
  [3, 2, 2, 2, 3],
  [0, 1, 2, 1, 0],
  [0, 2, 2, 2, 0],
  [0, 2, 1, 2, 0],
];
const colors = ["#fff", "#000", "#b7b7b7", "#ffa3f5"];
const guide = generateGuide(drawing, colors.length);

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Grid colors={colors} grid={drawing} guides={guide} />
      </div>
    );
  }
}

export default App;
