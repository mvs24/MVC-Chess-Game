import { Square } from "../types";
import { WHITE } from "../views/base";
import { Piece } from "./Piece";

export class Pawn extends Piece {
  constructor(position: number[], color: string, markup: string) {
    super(position, color, markup);
  }

  getAllMoves(): number[][] {
    const allMoves: number[][] = [];
    if (this.color === WHITE) {
      if (this.position[0] === 2) {
        allMoves.push([this.position[0] + 1, this.position[1]]);
        allMoves.push([this.position[0] + 2, this.position[1]]);
      } else {
        if (this.position[0] + 1 <= 8)
          allMoves.push([this.position[0] + 1, this.position[1]]);
      }
    } else {
      if (this.position[0] === 7) {
        allMoves.push([this.position[0] - 1, this.position[1]]);
        allMoves.push([this.position[0] - 2, this.position[1]]);
      } else {
        if (this.position[0] - 1 >= 1)
          allMoves.push([this.position[0] - 1, this.position[1]]);
      }
    }

    return allMoves;
  }

  getPossibleMoves() {
    const possibleMoves: number[][] = [];

    return possibleMoves;
  }
}
