import * as React from "react";

import Grid from "../../common/Grid";
import {
  generateEmptyDrawing,
  generateGuide,
  isDrawingComplete,
  updateDrawingWithColorRemoval,
  updateDrawingWithPaint,
} from "../../grid.utils";
import { IGrid, IGuide, IPosition, ISize } from "../../models";
import ColorEditor from "./ColorEditor";

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
  selectedColor: number;
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

    this.state = { grid, selectedSize, selectedColor: 0 };
  }

  public render() {
    const { grid, selectedSize, selectedColor } = this.state;
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
          <ColorEditor
            colors={grid.colors}
            selectedColor={selectedColor}
            onColorsChange={this.handleColorsChange}
            onSelectionChange={this.handleColorSelectionChange}
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

  private handleNameEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const grid = { ...this.state.grid, name };
    this.setState({ grid });
  };

  private handleColorsChange = (colors: string[]) => {
    const { grid, selectedColor } = this.state;
    const isDeletion = colors.length < grid.colors.length;
    const isAddition = colors.length > grid.colors.length;

    const drawing = isDeletion
      ? updateDrawingWithColorRemoval(grid.drawing, selectedColor)
      : grid.drawing;
    const guide = generateGuide(drawing, colors.length);

    const newGrid = { ...grid, drawing, colors, guide };
    const newSelectedColor = isDeletion
      ? Math.max(selectedColor - 1, 0)
      : isAddition ? colors.length - 1 : selectedColor;

    this.setState({ grid: newGrid, selectedColor: newSelectedColor });
  };

  private handleColorSelectionChange = (selectedColor: number) => this.setState({ selectedColor });

  private handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = parseInt(e.target.value, 10);
    const size = SIZES[selectedSize];
    const drawing = generateEmptyDrawing(size);
    const guide = generateGuide(drawing, this.state.grid.colors.length);
    const grid = { ...this.state.grid, drawing, guide };

    this.setState({ grid, selectedSize });
  };

  private handleCellEdit = (p: IPosition) => {
    const { grid, selectedColor } = this.state;

    const drawing = updateDrawingWithPaint(grid.drawing, selectedColor, p);
    const guide = generateGuide(drawing, grid.colors.length);
    const updatedGrid = { ...grid, drawing, guide };

    this.setState({ grid: updatedGrid });
  };

  private handleCreate = () => {
    console.log("CREATE !");
  };
}

export default Edit;
