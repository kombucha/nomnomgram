import { Guide, GuideState, GuideSquare } from "./types";

function range(start: number, end: number): Array<number> {
  return Array(end - start)
    .fill(undefined)
    .map((_, idx) => start + idx);
}

function generateRowGuide(row: Array<number>, colorsNb: number): Array<GuideSquare> {
  const colorStats = range(0, colorsNb).map(color => ({
    startIndex: -1,
    endIndex: -1,
    color,
    count: 0,
  }));

  for (let i = 0; i < row.length; i++) {
    const colorIdx = row[i];
    let colorStat = colorStats[colorIdx];

    if (colorStat.startIndex === -1) {
      colorStat.startIndex = i;
    }

    if (colorStat.endIndex < i) {
      colorStat.endIndex = i;
    }

    colorStat.count++;
  }

  return colorStats.map(colorStat => ({
    colorIndex: colorStat.color,
    count: colorStat.count,
    state: GuideState.UNSOLVED,
    consecutive:
      colorStat.startIndex !== -1 &&
      colorStat.count !== 1 &&
      colorStat.endIndex - colorStat.startIndex === colorStat.count - 1,
  }));
}

export function transpose<T>(matrix: Array<Array<T>>): Array<Array<T>> {
  return matrix.reduce(
    (prev: Array<Array<T>>, next: Array<T>) =>
      next.map((item, i) => (prev[i] || []).concat(next[i])),
    []
  );
}

export function generateGuide(grid: Array<Array<number>>, colorsNb: number): Guide {
  return {
    lines: grid.map(r => generateRowGuide(r, colorsNb)),
    columns: transpose(grid).map(c => generateRowGuide(c, colorsNb)),
  };
}
