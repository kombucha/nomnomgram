import * as React from "react";

import ColorButton from "../ColorButton";

import "./ColorPicker.css";

interface IProps {
  colors: string[];
  onColorSelected: ((color?: string) => void);
  selectedColor: string;
}

const ColorPicker = ({ colors, selectedColor, onColorSelected }: IProps) => (
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

export default ColorPicker;
