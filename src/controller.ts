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
  checkMode: boolean;
  kingAttacker: Piece | undefined;
  kingDefender: Piece | undefined;
}

export const state: State = {
  board: {
    squares: [],
  },
  pieces: [],
  currentPossibleMoves: [],
  currentPiece: undefined,
  turn: WHITE,
  checkMode: false,
  kingAttacker: undefined,
  kingDefender: undefined,
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

const getWhitePieces = () =>
  state.pieces.filter((piece: Piece) => piece.color === WHITE);

const getBlackPieces = () =>
  state.pieces.filter((piece: Piece) => piece.color === BLACK);

const getPieceBySquare = (position: number[]): Piece | null => {
  //@ts-ignore
  return state.pieces.find(
    (piece: Piece) => piece.row === position[0] && piece.column === position[1]
  );
};

const isAttackingPosition = (position: number[]) => {
  return state.pieces.some(
    (piece: Piece) =>
      piece.position[0] === position[0] && piece.position[1] === position[1]
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

const getNextMoves = (piece: Piece) => {
  return piece.getAllMoves();
};

const removePieceFromBoard = (piece: Piece) => {
  state.pieces = state.pieces.filter(
    (remainingPiece: Piece) => piece !== remainingPiece
  );
};

const attackPiece = (piece: Piece) => {
  pieceView.removePieceFromGivenSquare(piece.position);

  removePieceFromBoard(piece);
};

const getOpponentKing = () => {
  const opponentKingColor = state.currentPiece!.color === WHITE ? BLACK : WHITE;

  return state.pieces.find(
    (piece: Piece) =>
      piece.markup === (opponentKingColor === WHITE ? `&#9812` : "&#9818")
  );
};

const isKingPositionAttacked = (nextMoves: number[][]) => {
  const king = getOpponentKing();

  return nextMoves.some(
    (move) => move[0] === king!.row && move[1] === king!.column
  );
};

const isCheck = () => {
  const nextMoves = getNextMoves(state.currentPiece!);

  const opponentKingColor = state.currentPiece!.color === WHITE ? BLACK : WHITE;

  return opponentKingColor === WHITE
    ? isKingPositionAttacked(nextMoves)
    : isKingPositionAttacked(nextMoves);
};

const movePieceHandler = (position: number[]) => {
  pieceView.removePieceFromGivenSquare(state.currentPiece!.position);

  if (isAttackingPosition(position)) {
    const attackedPiece = getPieceBySquare(position)!;
    attackPiece(attackedPiece);
  }
  state.currentPiece!.move(position);

  if (isCheck()) {
    const opponentKing = getOpponentKing()! as King;
    opponentKing.setCheckMode(true);
    state.checkMode = true;
    state.kingAttacker = state.currentPiece;

    pieceView.renderCheckMode(opponentKing.position);
  }

  pieceView.movePiece(state.currentPiece!);

  pieceView.removeSquareAsPossibleMove();

  changeTurn();
};

const getAvailablePiecesToMoveInCheckMode = () => {
  const [kingAttackerRow, kingAttackerColumn] = state.kingAttacker!.position;
  const kingAttackerColor = state.kingAttacker!.color;

  const availablePiecesToMove: Piece[] = [];

  if (kingAttackerColor === WHITE) {
    const blackPieces = getBlackPieces();
    blackPieces.forEach((piece: Piece) => {
      const allMoves = piece.getAllMoves();
      if (
        allMoves.some(
          (move) =>
            move[0] === kingAttackerRow && move[1] === kingAttackerColumn
        )
      )
        availablePiecesToMove.push(piece);
    });
  } else if (kingAttackerColor === BLACK) {
    const whitePieces = getWhitePieces();
    whitePieces.forEach((piece: Piece) => {
      const allMoves = piece.getAllMoves();
      if (
        allMoves.some(
          (move) =>
            move[0] === kingAttackerRow && move[1] === kingAttackerColumn
        )
      )
        availablePiecesToMove.push(piece);
    });
  }

  return availablePiecesToMove;
};

const isAvailableMoveInCheckMode = (
  availablePiecesToMove: Piece[],
  currentPieceToMove: Piece | null
) => {
  if (currentPieceToMove === null) return false;

  return availablePiecesToMove.some(
    (piece: Piece) => piece === currentPieceToMove
  );
};

const checkModeController = (e: any, currentPieceToMove: Piece | null) => {
  // 1. Move KING if there is any possible move

  // 2. Find all the pieces that can attack the piece which is attacking KING
  const availablePiecesToMove: Piece[] = getAvailablePiecesToMoveInCheckMode();

  const isKingAttackerSquareChecked =
    e.target.closest(".square").dataset.position ===
    `${state.kingAttacker!.position[0]},${state.kingAttacker!.position[1]}`;

  if (
    isAvailableMoveInCheckMode(availablePiecesToMove, currentPieceToMove) ||
    isKingAttackerSquareChecked
  ) {
    pieceView.makeSquareAsPossibleMove(state.kingAttacker!.position);

    if (!isKingAttackerSquareChecked) {
      state.kingDefender = currentPieceToMove!;
    }

    if (isKingAttackerSquareChecked) {
      pieceView.removeCheckMode();
      pieceView.removePieceFromGivenSquare(state.kingDefender!.position);
      pieceView.removePieceFromGivenSquare(state.kingAttacker!.position);
      state.kingDefender?.move(state.kingAttacker!.position);
      removePieceFromBoard(state.kingAttacker!);
      pieceView.movePiece(state.kingDefender!);

      state.kingAttacker = undefined;
      state.kingDefender = undefined;
      state.checkMode = false;
      const checkedKing = state.pieces.find(
        (piece: Piece) => piece instanceof King && piece.checked === true
      ) as King;
      checkedKing.setCheckMode(false);

      changeTurn();
    }
  } else {
    pieceView.removeSquareAsPossibleMove();
  }
};

setInterval(() => console.log(state), 8000);

const movePieceController = (e: any) => {
  const currentPiecePosition = pieceView.getCurrentPiecePosition(e);
  const currentPiece = getPieceBySquare(currentPiecePosition);

  if (state.checkMode === true) return checkModeController(e, currentPiece);
  // if (state.turn === WHITE) {
  //   if (
  //     isAttackingPosition(currentPiecePosition) &&
  //     currentPiece?.color === BLACK
  //   )
  //     return;
  // } else {
  //   if (
  //     isAttackingPosition(currentPiecePosition) &&
  //     currentPiece?.color === WHITE
  //   )
  //     return;
  // }

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
