import * as React from "react";

import ColorButton from "../ColorButton";

import "./ColorPicker.css";

interface IProps {
  colors: string[];
  onColorSelected: ((colorIndex: number) => void);
  selectedColor: number;
}

const ColorPicker = ({ colors, selectedColor, onColorSelected }: IProps) => (
  <ul className="ColorPicker">
    {colors.map((color, idx) => (
      <li key={`${idx}-${color}`} className="ColorPicker__item">
        <ColorButton
          color={color}
          selected={idx === selectedColor}
          onClick={() => onColorSelected(idx)}
        />
      </li>
    ))}
  </ul>
);

export default ColorPicker;
