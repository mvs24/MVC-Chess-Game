import { elements, pieces } from "./base";
import { Square } from "../types";
import { Piece } from "../models/Piece";

export const renderSquare = (square: Square) => {
  const markup = `
    <div class='square ${square.color}' data-row='${square.position[0]}' data-column='${square.position[1]}' data-position='${square.position}'></div>
  `;
  elements.board!.insertAdjacentHTML("beforeend", markup);
};

export const renderPiece = (piece: Piece) => {
  const markup = `
    <span class='piece'>
      ${piece.markup}
    </span>
  `;
  document
    .querySelector(
      `[data-position='${piece.position[0]},${piece.position[1]}']`
    )!
    .insertAdjacentHTML("beforeend", markup);
};
