import { Piece } from "../models/Piece";

export const getCurrentPiecePosition = (e: any): number[] => {
  const squareElement = e.target.closest(".square");
  const pieceRow = +squareElement.dataset.row;
  const pieceColumn = +squareElement.dataset.column;

  return [pieceRow, pieceColumn];
};

export const removeSquareAsPossibleMove = () => {
  document
    .querySelectorAll(".possibleMove")
    .forEach((el) => el.classList.remove("possibleMove"));
};

export const makeSquareAsPossibleMove = (position: number[]) => {
  document
    .querySelector(`[data-position='${position[0]},${position[1]}']`)
    ?.classList.add("possibleMove");
};

export const removePieceFromGivenSquare = (position: number[]) => {
  document.querySelector(
    `[data-position='${position[0]},${position[1]}']`
  )!.innerHTML = "";
};

export const movePiece = (piece: Piece): void => {
  const markup = `
    <span class='piece'>
      ${piece.markup}
    </span>
  `;
  document
    .querySelector(`[data-position='${piece.row},${piece.column}']`)!
    .insertAdjacentHTML("beforeend", markup);
};

export const renderCheckMode = (position: number[]) => {
  document
    .querySelector(`[data-position='${position[0]},${position[1]}']`)!
    .classList.add("check");
};

export const removeCheckMode = () =>
  document.querySelector(".check")!.classList.remove("check");
