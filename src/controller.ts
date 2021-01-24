import { Bishop } from "./models/Bishop";
import { King } from "./models/King";
import { Knight } from "./models/Knight";
import { Pawn } from "./models/Pawn";
import { Piece } from "./models/Piece";
import { Queen } from "./models/Queen";
import { Rook } from "./models/Rook";
import { Square } from "./types";
import { BLACK, elements, pieces, WHITE } from "./views/base";
import * as boardView from "./views/boardView";
import * as pieceView from "./views/pieceView";

interface State {
  board: {
    squares: Square[];
  };
  pieces: Piece[];
  currentPossibleMoves: number[][];
  currentPiece: Piece | undefined;
  turn: "white" | "black";
}

export const state: State = {
  board: {
    squares: [],
  },
  pieces: [],
  currentPossibleMoves: [],
  currentPiece: undefined,
  turn: WHITE,
};

(() => {
  for (let i = 8; i >= 1; i--) {
    for (let j = 8; j >= 1; j--) {
      let color: Square["color"];
      if (i % 2 === 1 && j % 2 === 1) {
        color = WHITE;
      } else if (i % 2 === 1 && j % 2 === 0) {
        color = BLACK;
      } else if (i % 2 === 0 && j % 2 === 1) {
        color = BLACK;
      } else {
        color = WHITE;
      }
      state.board.squares.push({ color, position: [i, j] });
    }
  }
})();

const createPieces = () => {
  for (let i = 1; i <= 8; i++) {
    state.pieces.push(new Pawn([2, i], WHITE, pieces.whitePawn));
    state.pieces.push(new Pawn([7, i], BLACK, pieces.blackPawn));
  }
  state.pieces.push(new Rook([1, 1], WHITE, pieces.whiteRook));
  state.pieces.push(new Rook([1, 8], WHITE, pieces.whiteRook));
  state.pieces.push(new Rook([8, 1], BLACK, pieces.blackRook));
  state.pieces.push(new Rook([8, 8], BLACK, pieces.blackRook));

  state.pieces.push(new Knight([1, 2], WHITE, pieces.whiteKnight));
  state.pieces.push(new Knight([1, 7], WHITE, pieces.whiteKnight));
  state.pieces.push(new Knight([8, 2], BLACK, pieces.blackKnight));
  state.pieces.push(new Knight([8, 7], BLACK, pieces.blackKnight));

  state.pieces.push(new Bishop([1, 3], WHITE, pieces.whiteBishop));
  state.pieces.push(new Bishop([1, 6], WHITE, pieces.whiteBishop));
  state.pieces.push(new Bishop([8, 3], BLACK, pieces.blackBishop));
  state.pieces.push(new Bishop([8, 6], BLACK, pieces.blackBishop));

  state.pieces.push(new Queen([1, 5], WHITE, pieces.whiteQueen));
  state.pieces.push(new Queen([8, 5], BLACK, pieces.blackQueen));

  state.pieces.push(new King([1, 4], WHITE, pieces.whiteKing));
  state.pieces.push(new King([8, 4], BLACK, pieces.blackKing));
};

const createBoard = () => {
  state.board.squares.forEach((square) => {
    boardView.renderSquare(square);
  });
  createPieces();
  state.pieces.forEach((piece) => {
    boardView.renderPiece(piece);
  });
};

const getPieceBySquare = (position: number[]): Piece | null => {
  //@ts-ignore
  return state.pieces.find(
    (piece: Piece) => piece.row === position[0] && piece.column === position[1]
  );
};

const isValidMove = (position: number[]): boolean => {
  return state.currentPossibleMoves.some((possibleMove) => {
    return possibleMove[0] === position[0] && possibleMove[1] === position[1];
  });
};

const changeTurn = (): void => {
  state.turn = state.turn === WHITE ? BLACK : WHITE;
};

const movePieceHandler = (position: number[]) => {
  pieceView.removePieceFromGivenSquare(state.currentPiece!.position);

  state.currentPiece!.move(position);

  pieceView.movePiece(state.currentPiece!);

  pieceView.removeSquareAsPossibleMove();

  changeTurn();
};

const movePieceController = (e: any) => {
  const currentPiecePosition = pieceView.getCurrentPiecePosition(e);
  const currentPiece = getPieceBySquare(currentPiecePosition);

  if (state.turn === WHITE) {
    if (currentPiece?.color === BLACK) return;
  } else {
    if (currentPiece?.color === WHITE) return;
  }

  if (state.currentPossibleMoves.length > 0 && state.currentPiece) {
    if (isValidMove(currentPiecePosition)) {
      return movePieceHandler(currentPiecePosition);
    }
  }

  if (currentPiece) {
    state.currentPiece = currentPiece;
    state.currentPossibleMoves = currentPiece.getAllMoves();
  } else {
    state.currentPiece = undefined;
    state.currentPossibleMoves = [];
  }

  pieceView.removeSquareAsPossibleMove();
  state.currentPossibleMoves.forEach((move) => {
    pieceView.makeSquareAsPossibleMove(move);
  });
};

createBoard();
elements.board!.addEventListener("click", movePieceController);
