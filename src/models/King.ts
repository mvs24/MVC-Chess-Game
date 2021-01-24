import { Piece } from "./Piece";

export class King extends Piece {
  constructor(position: number[], color: string, markup: string) {
    super(position, color, markup);
  }

  getAllMoves() {
    const allMoves: number[][] = [];

    if (this.row + 1 <= 8) allMoves.push([this.row + 1, this.column]);

    if (this.row - 1 >= 1) allMoves.push([this.row - 1, this.column]);

    if (this.column - 1 >= 1) allMoves.push([this.row, this.column - 1]);

    if (this.column + 1 <= 8) allMoves.push([this.row, this.column + 1]);

    if (this.row + 1 <= 8 && this.column + 1 <= 8)
      allMoves.push([this.row + 1, this.column + 1]);

    if (this.row + 1 <= 8 && this.column - 1 >= 1)
      allMoves.push([this.row + 1, this.column - 1]);

    if (this.row - 1 >= 1 && this.column + 1 <= 8)
      allMoves.push([this.row - 1, this.column + 1]);

    if (this.row - 1 >= 1 && this.column - 1 >= 1)
      allMoves.push([this.row - 1, this.column - 1]);

    return allMoves;
  }

  getPossibleMoves() {
    const possibleMoves: number[][] = [];

    return possibleMoves;
  }
}
