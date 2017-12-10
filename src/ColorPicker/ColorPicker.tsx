import * as React from "react";
import ColorButton from "../ColorButton";

import "./ColorPicker.css";

interface Props {
  colors: string[];
  onColorSelected: ((color: string) => void);
  selectedColor: string;
}

class ColorPicker extends React.PureComponent<Props> {
  render() {
    const { colors, selectedColor, onColorSelected } = this.props;

    return (
      <ul className="ColorPicker">
        {colors.map(color => (
          <li key={color} className="ColorPicker__item">
            <ColorButton
              color={color}
              selected={selectedColor === color}
              onClick={() => onColorSelected(color)}
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default ColorPicker;
