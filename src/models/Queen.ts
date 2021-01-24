import { Piece } from "./Piece";

export class Queen extends Piece {
  constructor(position: number[], color: string, markup: string) {
    super(position, color, markup);
  }

  getAllTopLeftMoves() {
    const leftTopMoves: number[][] = [];
    for (
      let i = this.position[0] + 1, j = this.position[1] + 1;
      i <= 8 && j <= 8;
      i++, j++
    ) {
      leftTopMoves.push([i, j]);
    }
    return leftTopMoves;
  }

  getAllTopRightMoves() {
    const rightTopMoves: number[][] = [];
    for (
      let i = this.position[0] + 1, j = this.position[1] - 1;
      i <= 8 && j >= 1;
      i++, j--
    ) {
      rightTopMoves.push([i, j]);
    }
    return rightTopMoves;
  }

  getAllBottomLeftMoves() {
    const leftBottomMoves: number[][] = [];
    for (
      let i = this.position[0] - 1, j = this.position[1] + 1;
      i >= 1 && j <= 8;
      i--, j++
    ) {
      leftBottomMoves.push([i, j]);
    }
    return leftBottomMoves;
  }

  getAllBottomRightMoves() {
    const rightBottomMoves: number[][] = [];
    for (
      let i = this.position[0] - 1, j = this.position[1] - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      rightBottomMoves.push([i, j]);
    }

    return rightBottomMoves;
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

  getTopMoves() {
    const conflictMoves: number[][] = this.getConflictMoves(
      this.getAllTopMoves()
    );

    if (conflictMoves.length === 0) return this.getAllTopMoves();

    const availableMoves: number[][] = [];

    const [conflictMove] = conflictMoves;

    if (this.color !== this.getConflictingPiece(conflictMove).color) {
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
    if (this.color !== this.getConflictingPiece(conflictMove).color) {
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

    if (this.color !== this.getConflictingPiece(conflictMove).color) {
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
    if (this.color !== this.getConflictingPiece(conflictMove).color) {
      availableMoves.push(conflictMove);
    }

    this.getAllRightMoves().forEach((leftMove) => {
      if (leftMove[1] > conflictMove[1]) {
        availableMoves.push(leftMove);
      }
    });

    return availableMoves;
  }

  getAllMoves() {
    return [
      ...this.getLeftBottomMoves(),
      ...this.getLeftTopMoves(),
      ...this.getRightBottomMoves(),
      ...this.getRightTopMoves(),
      ...this.getLeftMoves(),
      ...this.getBottomMoves(),
      ...this.getRightMoves(),
      ...this.getTopMoves(),
    ];
  }

  getRightBottomMoves() {
    const rightBottomMoves: number[][] = this.getAllBottomRightMoves();

    const conflictPositions: number[][] = this.getConflictMoves(
      rightBottomMoves
    );

    if (conflictPositions.length === 0) return rightBottomMoves;

    conflictPositions.sort((a, b) => {
      if (a[1] > b[1]) return -1;
      return 1;
    });

    const availableMoves: number[][] = [];
    const [conflictPosition] = conflictPositions;
    if (this.color !== this.getConflictingPiece(conflictPosition).color) {
      availableMoves.push(conflictPosition);
    }

    rightBottomMoves.forEach((move) => {
      if (move[0] > conflictPosition[0]) {
        availableMoves.push(move);
      }
    });

    return availableMoves;
  }

  getLeftBottomMoves() {
    const leftBottomMoves: number[][] = this.getAllBottomLeftMoves();

    const conflictPositions: number[][] = this.getConflictMoves(
      leftBottomMoves
    );

    if (conflictPositions.length === 0) return leftBottomMoves;
    conflictPositions.sort((a, b) => {
      if (a[0] > b[0]) return -1;
      return 1;
    });
    const [conflictPosition] = conflictPositions;
    const availableMoves: number[][] = [];

    if (this.color !== this.getConflictingPiece(conflictPosition).color) {
      availableMoves.push(conflictPosition);
    }

    leftBottomMoves.forEach((move) => {
      if (move[0] > conflictPosition[0]) {
        availableMoves.push(move);
      }
    });

    return availableMoves;
  }

  getRightTopMoves() {
    const rightTopMoves: number[][] = this.getAllTopRightMoves();

    const conflictPositions: number[][] = this.getConflictMoves(rightTopMoves);

    if (conflictPositions.length === 0) return rightTopMoves;

    conflictPositions.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      return -1;
    });

    const [conflictPosition] = conflictPositions;
    const availableMoves: number[][] = [];

    if (this.color !== this.getConflictingPiece(conflictPosition).color) {
      availableMoves.push(conflictPosition);
    }

    rightTopMoves.forEach((move) => {
      if (move[0] < conflictPosition[0]) {
        availableMoves.push(move);
      }
    });

    return availableMoves;
  }

  getLeftTopMoves() {
    const leftTopMoves: number[][] = this.getAllTopLeftMoves();

    const conflictPositions: number[][] = this.getConflictMoves(leftTopMoves);

    if (conflictPositions.length === 0) return leftTopMoves;

    conflictPositions.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      return -1;
    });

    const [conflictPosition] = conflictPositions;
    const availableMoves: number[][] = [];

    if (this.color !== this.getConflictingPiece(conflictPosition).color) {
      availableMoves.push(conflictPosition);
    }

    leftTopMoves.forEach((move) => {
      if (move[0] < conflictPosition[0]) {
        availableMoves.push(move);
      }
    });

    return availableMoves;
  }

  getPossibleMoves() {
    return [
      ...this.getLeftBottomMoves(),
      ...this.getLeftTopMoves(),
      ...this.getRightBottomMoves(),
      ...this.getRightTopMoves(),
      ...this.getLeftMoves(),
      ...this.getBottomMoves(),
      ...this.getRightMoves(),
      ...this.getTopMoves(),
    ];
  }
}
