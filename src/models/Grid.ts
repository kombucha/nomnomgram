import { IGuide } from "./Guide";

export interface IGrid {
  // Meta
  name: string;
  author: string;

  // Actual grid info
  drawing: number[][];
  guide: IGuide;
  colors: string[];
}
