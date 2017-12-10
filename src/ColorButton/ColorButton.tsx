import * as React from "react";
import * as classNames from "classnames";

import "./ColorButton.css";

interface Props {
  color: string;
  selected?: boolean;
  onClick?: ((e: React.MouseEvent<HTMLElement>) => void);
}

const ColorButton = ({ color, selected, onClick }: Props) => {
  const colorStyle = { backgroundColor: color };
  const classes = classNames("ColorButton", { "ColorButton--selected": selected });
  return <button className={classes} style={colorStyle} onClick={onClick} />;
};

export default ColorButton;
