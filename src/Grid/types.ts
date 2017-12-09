export interface Guide {
  lines: Array<Array<GuideSquare>>;
  columns: Array<Array<GuideSquare>>;
}

export enum GuideState {
  UNSOLVED,
  SOLVED,
  ERROR,
}

export interface GuideSquare {
  colorIndex: number;
  count: number;
  consecutive: boolean;
  state: GuideState;
}
