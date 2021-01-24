import { state } from "../controller";
import { BLACK, WHITE } from "../views/base";

export abstract class Piece {
  abstract getAllMoves(): number[][];
  abstract getPossibleMoves(): number[][];

  public row: number;
  public column: number;

  constructor(
    public position: number[],
    public color: string,
    public markup: string
  ) {
    this.row = position[0];
    this.column = position[1];
  }

  setRowAndColumn() {
    this.row = this.position[0];
    this.column = this.position[1];
  }

  getConflictMoves(possibleMoves: number[][]) {
    const conflictPositions: number[][] = [];

    state.pieces.forEach((piece) => {
      possibleMoves.forEach((possibleMove) => {
        if (
          piece.position[0] === possibleMove[0] &&
          piece.position[1] === possibleMove[1]
        ) {
          conflictPositions.push(possibleMove);
        }
      });
    });

    return conflictPositions;
  }

  getConflictingPiece(conflictMove: number[]): Piece | undefined {
    return state.pieces.find(
      (piece: Piece) =>
        piece.position[0] === conflictMove[0] &&
        piece.position[1] === conflictMove[1]
    );
  }

  move(position: number[]) {
    this.position = position;
    this.setRowAndColumn();
  }
}
