import { Piece } from "./Piece";

export class Knight extends Piece {
  constructor(position: number[], color: string, markup: string) {
    super(position, color, markup);
  }

  isValidMove(move: number[]) {
    const conflictingPiece: Piece = this.getConflictingPiece(move);

    if (this.color === conflictingPiece.color) return false;
    else return true;
  }

  getAllMoves() {
    const allMoves: number[][] = [];

    if (this.row + 2 <= 8 && this.column - 1 >= 1) {
      if (this.isValidMove([this.row + 2, this.column - 1]))
        allMoves.push([this.row + 2, this.column - 1]);
    }
    if (this.row + 1 <= 8 && this.column - 2 >= 1) {
      if (this.isValidMove([this.row + 1, this.column - 2]))
        allMoves.push([this.row + 1, this.column - 2]);
    }
    if (this.row - 1 >= 1 && this.column - 2 >= 1) {
      if (this.isValidMove([this.row - 1, this.column - 2]))
        allMoves.push([this.row - 1, this.column - 2]);
    }
    if (this.row - 2 >= 1 && this.column - 1 >= 1) {
      if (this.isValidMove([this.row - 2, this.column - 1]))
        allMoves.push([this.row - 2, this.column - 1]);
    }

    if (this.row + 2 <= 8 && this.column + 1 <= 8) {
      if (this.isValidMove([this.row + 2, this.column + 1]))
        allMoves.push([this.row + 2, this.column + 1]);
    }
    if (this.row + 1 <= 8 && this.column + 2 <= 8) {
      if (this.isValidMove([this.row + 1, this.column + 2]))
        allMoves.push([this.row + 1, this.column + 2]);
    }
    if (this.row - 1 >= 1 && this.column + 2 <= 8) {
      if (this.isValidMove([this.row - 1, this.column + 2]))
        allMoves.push([this.row - 1, this.column + 2]);
    }
    if (this.row - 2 >= 1 && this.column + 1 <= 8) {
      if (this.isValidMove([this.row - 2, this.column + 1]))
        allMoves.push([this.row - 2, this.column + 1]);
    }

    return allMoves;
  }

  getPossibleMoves() {
    return this.getAllMoves();
  }
}
