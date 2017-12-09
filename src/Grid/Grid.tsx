import * as React from "react";
import * as classNames from "classnames";
import { Guide, GuideSquare } from "./types";
import { transpose } from "./utils";

import "./Grid.css";

interface Props {
  grid: Array<Array<number>>;
  colors: Array<string>;
  guides?: Guide;
}

interface Coordinate {
  x: number;
  y: number;
}

const DARK_SQUARE_CLASS = "Grid__square--dark";

class Grid extends React.PureComponent<Props, object> {
  hovered?: Coordinate;
  mouseDown: boolean = false;

  onMouseDown = () => (this.mouseDown = true);
  onMouseUp = () => (this.mouseDown = false);
  onMouseMove = (e: MouseEvent) => {
    if (!this.mouseDown) {
      return;
    }
  };

  renderTopGuide = (columnGuides: Array<Array<GuideSquare>>) => {
    const transposedGuide = transpose(columnGuides);
    const colorsNb = this.props.colors.length;

    return transposedGuide.map((column, rowIdx) => (
      <tr key={rowIdx}>
        <th colSpan={colorsNb} />
        {column.map((square, idx) =>
          this.renderGuideSquare(idx, square, idx % 2 ? DARK_SQUARE_CLASS : "")
        )}
      </tr>
    ));
  };

  renderGuideSquare = (key: number, square: GuideSquare, className: string = "") => {
    const color = this.props.colors[square.colorIndex];
    const colorStyle = { color };
    const squareClass = classNames("Grid__square", "Grid__square--guide", className);
    const countClass = classNames("Grid__count", {
      "Grid__count--consecutive": square.consecutive,
    });

    return (
      <th key={key} className={squareClass} style={colorStyle}>
        <span className={countClass}>{square.count ? square.count : ""}</span>
      </th>
    );
  };

  renderSquare = (key: number, colorIdx: number) => {
    const color = this.props.colors[colorIdx];
    const colorStyle = color ? { background: color } : undefined;

    return <td key={key} className="Grid__square" style={colorStyle} />;
  };

  renderLine = (rowIdx: number, line: Array<number>, lineGuide?: Array<GuideSquare>) => {
    return (
      <tr key={rowIdx}>
        {lineGuide &&
          lineGuide.map((square, idx) =>
            this.renderGuideSquare(idx, square, rowIdx % 2 ? DARK_SQUARE_CLASS : "")
          )}
        {line.map((color, idx) => this.renderSquare(idx, color))}
      </tr>
    );
  };

  render() {
    const { grid, guides } = this.props;
    return (
      <table className="Grid">
        <tbody>
          {guides && this.renderTopGuide(guides.columns)}
          {grid.map((line, idx) =>
            this.renderLine(idx, line, guides ? guides.lines[idx] : undefined)
          )}
        </tbody>
      </table>
    );
  }
}

export default Grid;
