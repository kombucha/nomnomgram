import * as React from "react";
import * as classNames from "classnames";
import { throttle, Cancelable } from "lodash"; // TODO: find import syntax to really import debounce solely...
import { Position, Guide, GuideSquare } from "./types";
import { transpose } from "./utils";

import "./Grid.css";
import { MouseEvent } from "react";

interface Props {
  grid: number[][];
  colors: string[];
  guides?: Guide;
  onToggleCell?: ((position: Position) => void);
}

const DARK_SQUARE_CLASS: string = "Grid__square--dark";

class Grid extends React.PureComponent<Props> {
  private lastPosition?: Position;
  private mouseDown: boolean = false;

  componentWillUnmount() {
    this.throttledToggleHandler.cancel();
  }

  render() {
    const { grid, guides } = this.props;
    return (
      <table
        className="Grid"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}>
        <tbody>
          {guides && this.renderTopGuide(guides.columns)}
          {grid.map((line, idx) =>
            this.renderLine(idx, line, guides ? guides.lines[idx] : undefined)
          )}
        </tbody>
      </table>
    );
  }

  private getPosition(el: HTMLElement): Position | undefined {
    return el.dataset.x
      ? { x: parseInt(el.dataset.x!, 10), y: parseInt(el.dataset.y!, 10) }
      : undefined;
  }

  private handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (!this.props.onToggleCell) {
      return;
    }

    this.mouseDown = true;
    const cell = e.target as HTMLElement;
    this.throttledToggleHandler(cell);
  };
  private handleMouseUp = () => {
    this.mouseDown = false;
    this.lastPosition = undefined;
  };

  private throttledToggleHandler = throttle((cell: HTMLElement) => {
    const currentPosition = this.getPosition(cell);

    if (
      currentPosition &&
      (!this.lastPosition ||
        this.lastPosition.x !== currentPosition.x ||
        this.lastPosition.y !== currentPosition.y)
    ) {
      this.lastPosition = currentPosition;
      this.props.onToggleCell!(currentPosition);
    }
  }, 33);

  private handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!this.mouseDown) {
      return;
    }

    const cell = e.target as HTMLElement;
    this.throttledToggleHandler(cell);
  };

  private renderTopGuide = (columnGuides: Array<Array<GuideSquare>>) => {
    const transposedGuide = transpose(columnGuides);
    const colorsNb = this.props.colors.length;

    return transposedGuide.map((column, rowIdx) => (
      <tr key={rowIdx}>
        <th colSpan={colorsNb} />
        {column.map((square, idx) =>
          this.renderGuideSquare(idx, square, idx % 2 ? "" : DARK_SQUARE_CLASS)
        )}
      </tr>
    ));
  };

  private renderGuideSquare = (key: number, square: GuideSquare, className: string = "") => {
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

  private renderSquare = (position: Position, colorIdx: number) => {
    const color = this.props.colors[colorIdx];
    const colorStyle = color ? { background: color } : undefined;

    return (
      <td
        key={`${position.x}:${position.y}`}
        className="Grid__square"
        style={colorStyle}
        data-x={position.x}
        data-y={position.y}
      />
    );
  };

  private renderLine = (rowIdx: number, line: Array<number>, lineGuide?: Array<GuideSquare>) => {
    return (
      <tr key={rowIdx}>
        {lineGuide &&
          lineGuide.map((square, idx) =>
            this.renderGuideSquare(idx, square, rowIdx % 2 ? "" : DARK_SQUARE_CLASS)
          )}
        {line.map((color, idx) => this.renderSquare({ x: idx, y: rowIdx }, color))}
      </tr>
    );
  };
}

export default Grid;
