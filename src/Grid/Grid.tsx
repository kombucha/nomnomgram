import * as classNames from "classnames";
import * as React from "react";

import { throttle } from "lodash"; // TODO: find import syntax to really import debounce solely...
import { IGuide, IGuideSquare, IPosition } from "./types";
import { transpose } from "./utils";

import "./Grid.css";

interface IProps {
  grid: number[][];
  colors: string[];
  guide?: IGuide;
  onToggleCell?: ((position: IPosition) => void);
}

const DARK_SQUARE_CLASS: string = "Grid__square--dark";

class Grid extends React.PureComponent<IProps> {
  private lastPosition?: IPosition;
  private mouseDown: boolean = false;

  public componentWillUnmount() {
    this.throttledToggleHandler.cancel();
  }

  public render() {
    const { grid, guide } = this.props;
    return (
      <table
        className="Grid"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}>
        <tbody>
          {guide && this.renderTopGuide(guide.columns)}
          {grid.map((line, idx) =>
            this.renderLine(idx, line, guide ? guide.lines[idx] : undefined)
          )}
        </tbody>
      </table>
    );
  }

  private getPosition(el: HTMLElement): IPosition | undefined {
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

  // tslint:disable-next-line:member-ordering
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

  private renderTopGuide = (columnGuides: IGuideSquare[][]) => {
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

  private renderGuideSquare = (key: number, square: IGuideSquare, className: string = "") => {
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

  private renderSquare = (position: IPosition, colorIdx: number) => {
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

  private renderLine = (rowIdx: number, line: number[], lineGuide?: IGuideSquare[]) => {
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
