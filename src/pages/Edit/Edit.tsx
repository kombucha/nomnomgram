import * as React from "react";

import ColorPicker from "../../common/ColorPicker";
import Grid from "../../common/Grid";
import {
  generateEmptyDrawing,
  generateGuide,
  isDrawingComplete,
  updateDrawing,
} from "../../grid.utils";
import { IGrid, IGuide, IPosition, ISize } from "../../models";

import "./Edit.css";

const SIZES: ISize[] = [
  { width: 5, height: 5 },
  { width: 5, height: 10 },
  { width: 10, height: 10 },
  { width: 10, height: 15 },
];

interface IState {
  grid: IGrid;
  selectedSize: number;
  currentColorIdx: number;
}

class Edit extends React.PureComponent<object, IState> {
  constructor(props: object) {
    super(props);
    const selectedSize = 0;
    const size = SIZES[selectedSize];
    const drawing = generateEmptyDrawing(size);
    const colors = ["#fff", "#000", "#b7b7b7", "#ffa3f5"];
    const guide = generateGuide(drawing, colors.length);

    // Default grid
    const grid = {
      name: "Default name",
      author: "",
      drawing,
      colors,
      guide,
    };

    this.state = { grid, selectedSize, currentColorIdx: 0 };
  }

  public render() {
    const { grid, selectedSize, currentColorIdx } = this.state;
    const selectedColor = grid.colors[currentColorIdx];
    const shouldDisableButton = !this.isGridValid(grid);

    return (
      <div className="Edit">
        <Grid grid={grid} showGuide={true} onToggleCell={this.handleCellEdit} />
        <div className="Edit__controls">
          <label htmlFor="name">
            <span>Grid name</span>
            <input id="name" type="text" value={grid.name} onChange={this.handleNameEdit} />
          </label>
          <label htmlFor="size">
            <span>Grid size</span>
            <select value={selectedSize} onChange={this.handleSizeChange}>
              {SIZES.map((size, idx) => (
                <option key={idx} value={idx}>
                  {size.width} * {size.height}
                </option>
              ))}
            </select>
          </label>
          <ColorPicker
            colors={grid.colors}
            selectedColor={selectedColor}
            onColorSelected={this.handleColorSelected}
          />

          <button disabled={shouldDisableButton} onClick={this.handleCreate}>
            Create
          </button>
        </div>
      </div>
    );
  }

  private isGridValid = (grid: IGrid): boolean => {
    return isDrawingComplete(grid.drawing) && !!grid.name;
  };

  private handleColorSelected = (color: string) => {
    const currentColorIdx = this.state.grid.colors.indexOf(color);
    this.setState({ currentColorIdx });
  };

  private handleNameEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const grid = { ...this.state.grid, name };
    this.setState({ grid });
  };

  private handleColorChange = () => {
    console.log("color change");
  };

  private handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = parseInt(e.target.value, 10);
    const size = SIZES[selectedSize];
    const drawing = generateEmptyDrawing(size);
    const guide = generateGuide(drawing, this.state.grid.colors.length);
    const grid = { ...this.state.grid, drawing, guide };

    this.setState({ grid, selectedSize });
  };

  private handleCellEdit = (p: IPosition) => {
    const { grid, currentColorIdx } = this.state;

    const drawing = updateDrawing(grid.drawing, currentColorIdx, p);
    const guide = generateGuide(drawing, grid.colors.length);
    const updatedGrid = { ...grid, drawing, guide };

    this.setState({ grid: updatedGrid });
  };

  private handleCreate = () => {
    console.log("CREATE !");
  };
}

export default Edit;
