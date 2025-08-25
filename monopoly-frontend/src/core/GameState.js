export class GameState {
  constructor(board, players) {
    this.board = board;    // datos del backend
    this.players = players; // [{nick, country, money, pos, props, color}]
    this.turn = 0;
  }

  currentPlayer() {
    return this.players[this.turn % this.players.length];
  }

  moveCurrent(n) {
    const p = this.currentPlayer();
    p.pos = (p.pos + n) % this.board.length;
    console.log(`${p.nick} se movió a casilla ${p.pos}`);
    // TODO: disparar evento o callback
  }
}
