import * as React from "react";
import { ColorResult, CompactPicker } from "react-color";

import ColorPicker from "../../../common/ColorPicker";

interface IProps {
  colors: string[];
  selectedColor: number;
  onColorsChange: ((colors: string[]) => void);
  onSelectionChange: ((colorIndex: number) => void);
  minColors?: number;
  maxColors?: number;
}

class ColorEditor extends React.PureComponent<IProps, object> {
  public render() {
    const { colors, selectedColor, onSelectionChange } = this.props;
    const minColors = this.props.minColors || 2;
    const maxColors = this.props.minColors || 5;

    const disableAddButton = colors.length === maxColors;
    const disableDeleteButton = colors.length === minColors;

    return (
      <div className="ColorEditor">
        <ColorPicker
          colors={colors}
          selectedColor={selectedColor}
          onColorSelected={onSelectionChange}
        />
        <button disabled={disableAddButton} onClick={this.handleAddColor}>
          add
        </button>
        <div className="ColorEditor__current">
          <CompactPicker color={colors[selectedColor]} onChangeComplete={this.handleChangeColor} />
          <button disabled={disableDeleteButton} onClick={this.handleDeleteColor}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  private handleAddColor = () => {
    const { colors, onColorsChange } = this.props;
    onColorsChange([...colors, "#fff"]);
  };

  private handleChangeColor = ({ hex: newColor }: ColorResult) => {
    const { colors, selectedColor, onColorsChange } = this.props;
    const newColors = colors.map((color, idx) => (idx === selectedColor ? newColor : color));
    onColorsChange(newColors);
  };

  private handleDeleteColor = () => {
    const { colors, selectedColor, onColorsChange } = this.props;
    onColorsChange(colors.filter((_, idx) => idx !== selectedColor));
  };
}

export default ColorEditor;
