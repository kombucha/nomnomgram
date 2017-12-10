export interface IGuide {
  lines: IGuideSquare[][];
  columns: IGuideSquare[][];
}

export enum GuideState {
  UNSOLVED,
  SOLVED,
  ERROR,
}

export interface IGuideSquare {
  colorIndex: number;
  count: number;
  consecutive: boolean;
  state: GuideState;
}

export interface IPosition {
  x: number;
  y: number;
}
