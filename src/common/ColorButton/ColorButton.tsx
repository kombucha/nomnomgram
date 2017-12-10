import * as classNames from "classnames";
import * as React from "react";

import "./ColorButton.css";

interface IProps {
  color: string;
  selected?: boolean;
  onClick?: ((e: React.MouseEvent<HTMLElement>) => void);
}

const ColorButton = ({ color, selected, onClick }: IProps) => {
  const colorStyle = { backgroundColor: color };
  const classes = classNames("ColorButton", { "ColorButton--selected": selected });
  return <button className={classes} style={colorStyle} onClick={onClick} />;
};

export default ColorButton;
