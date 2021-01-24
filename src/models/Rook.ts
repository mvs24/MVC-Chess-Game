import { Piece } from "./Piece";

export class Rook extends Piece {
  constructor(position: number[], color: string, markup: string) {
    super(position, color, markup);
  }

  getAllLeftMoves() {
    const allLeftMoves: number[][] = [];
    for (let j = this.column + 1; j <= 8; j++) {
      allLeftMoves.push([this.row, j]);
    }
    return allLeftMoves;
  }

  getAllTopMoves() {
    const allTopMoves: number[][] = [];
    for (let i = this.row + 1; i <= 8; i++) {
      allTopMoves.push([i, this.column]);
    }
    return allTopMoves;
  }

  getAllRightMoves() {
    const allRightMoves: number[][] = [];
    for (let j = this.column - 1; j >= 1; j--) {
      allRightMoves.push([this.row, j]);
    }
    return allRightMoves;
  }

  getAllBottomMoves() {
    const allBottomMoves: number[][] = [];
    for (let i = this.row - 1; i >= 1; i--) {
      allBottomMoves.push([i, this.column]);
    }
    return allBottomMoves;
  }

  getAllMoves() {
    return [
      ...this.getLeftMoves(),
      ...this.getBottomMoves(),
      ...this.getRightMoves(),
      ...this.getTopMoves(),
    ];
  }

  getTopMoves() {
    const conflictMoves: number[][] = this.getConflictMoves(
      this.getAllTopMoves()
    );

    if (conflictMoves.length === 0) return this.getAllTopMoves();

    const availableMoves: number[][] = [];

    const [conflictMove] = conflictMoves;

    if (this.color !== this.getConflictingPiece(conflictMove)!.color) {
      availableMoves.push(conflictMove);
    }
    this.getAllTopMoves().forEach((topMove) => {
      if (topMove[0] < conflictMove[0]) {
        availableMoves.push(topMove);
      }
    });

    return availableMoves;
  }

  getBottomMoves() {
    const conflictMoves: number[][] = this.getConflictMoves(
      this.getAllBottomMoves()
    );

    if (conflictMoves.length === 0) return this.getAllBottomMoves();

    const availableMoves: number[][] = [];

    const [conflictMove] = conflictMoves;
    if (this.color !== this.getConflictingPiece(conflictMove)!.color) {
      availableMoves.push(conflictMove);
    }

    this.getAllBottomMoves().forEach((bottomMove) => {
      if (bottomMove[0] > conflictMove[0]) {
        availableMoves.push(bottomMove);
      }
    });

    return availableMoves;
  }

  getLeftMoves() {
    const conflictMoves: number[][] = this.getConflictMoves(
      this.getAllLeftMoves()
    );

    if (conflictMoves.length === 0) return this.getAllLeftMoves();

    const availableMoves: number[][] = [];

    const [conflictMove] = conflictMoves.sort((a, b) => {
      if (a[1] > b[1]) return 1;
      return -1;
    });

    if (this.color !== this.getConflictingPiece(conflictMove)!.color) {
      availableMoves.push(conflictMove);
    }
    this.getAllLeftMoves().forEach((leftMove) => {
      if (leftMove[1] < conflictMove[1]) {
        availableMoves.push(leftMove);
      }
    });

    return availableMoves;
  }

  getRightMoves() {
    const conflictMoves: number[][] = this.getConflictMoves(
      this.getAllRightMoves()
    );

    if (conflictMoves.length === 0) return this.getAllRightMoves();

    const availableMoves: number[][] = [];

    const [conflictMove] = conflictMoves.sort((a, b) => {
      if (a[1] < b[1]) return 1;
      return -1;
    });
    if (this.color !== this.getConflictingPiece(conflictMove)!.color) {
      availableMoves.push(conflictMove);
    }

    this.getAllRightMoves().forEach((leftMove) => {
      if (leftMove[1] > conflictMove[1]) {
        availableMoves.push(leftMove);
      }
    });

    return availableMoves;
  }

  getPossibleMoves() {
    return [
      ...this.getLeftMoves(),
      ...this.getBottomMoves(),
      ...this.getRightMoves(),
      ...this.getTopMoves(),
    ];
  }
}
