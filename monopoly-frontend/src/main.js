import { GameState } from "./core/GameState.js";
import { BoardRenderer } from "./ui/BoardRenderer.js";
import { getBoard } from "./api/base.js";

let game = null;

async function init() {
  console.log("Inicializando juego...");

  // Cargar tablero desde backend
  const boardData = await getBoard();
  console.log("Board recibido:", boardData);
  console.log("Tipo de datos:", typeof boardData);
  console.log("Es array?", Array.isArray(boardData));

  // Inicializar estado
  game = new GameState(boardData, []);
  // TODO: pedir jugadores en UI de setup

  // Renderizar tablero
  const boardEl = document.getElementById("board");
  BoardRenderer.render(boardEl, boardData);
}

init();