import * as utils from "./grid.utils";

describe("updateDrawingWithColorRemoval", () => {
  it("should reset the deletedColor from the grid", () => {
    const drawing = [
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
    ];

    const result = utils.updateDrawingWithColorRemoval(drawing, 4);

    expect(result).toEqual([
      [0, 1, 2, 3, -1],
      [0, 1, 2, 3, -1],
      [0, 1, 2, 3, -1],
      [0, 1, 2, 3, -1],
      [0, 1, 2, 3, -1],
    ]);
  });

  it("should shift colors above the deleted index", () => {
    const drawing = [
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
      [0, 1, 2, 3, 4],
    ];

    const result = utils.updateDrawingWithColorRemoval(drawing, 2);

    expect(result).toEqual([
      [0, 1, -1, 2, 3],
      [0, 1, -1, 2, 3],
      [0, 1, -1, 2, 3],
      [0, 1, -1, 2, 3],
      [0, 1, -1, 2, 3],
    ]);
  });
});
