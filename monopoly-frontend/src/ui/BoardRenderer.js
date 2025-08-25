export const BoardRenderer = {
  render(container, boardData) {
    container.innerHTML = "";
    const board = document.createElement("div");
    board.className = "monopoly-board";

    // Crear grid 11x11 (casillas solo en el borde)
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 11; col++) {
        const cell = document.createElement("div");
        
        // Solo poner casillas en el borde del tablero
        if (row === 0 || row === 10 || col === 0 || col === 10) {
          const position = this.getPositionFromGrid(row, col);
          const tile = this.getTileData(boardData, position);
          
          cell.className = "tile";
          cell.setAttribute('data-position', position);
          
          const name = tile?.name || tile?.title || `Casilla ${position}`;
          const color = tile?.color || '#ffffff';
          
          cell.innerHTML = `
            <div class="tile-header" style="background-color: ${color}"></div>
            <span class="tile-name">${name}</span>
          `;
        } else {
          // Celda del centro (vacía)
          cell.className = "center-area";
        }
        
        board.appendChild(cell);
      }
    }

    container.appendChild(board);
    console.log("Tablero Monopoly renderizado en formato cuadrado");
  },

  // Convertir posición del grid a índice del tablero
  getPositionFromGrid(row, col) {
    if (row === 0) return 10 - col; // Fila superior (derecha a izquierda)
    if (col === 0) return 20 + row; // Columna izquierda (arriba a abajo)
    if (row === 10) return 30 + col; // Fila inferior (izquierda a derecha)
    if (col === 10) return 40 - row; // Columna derecha (abajo a arriba)
    return 0;
  },

  // Obtener datos de una casilla específica
  getTileData(boardData, position) {
    const allSections = ['bottom', 'left', 'top', 'right'];
    let allTiles = [];
    
    allSections.forEach(section => {
      if (boardData[section]) {
        allTiles = allTiles.concat(boardData[section]);
      }
    });
    
    return allTiles[position] || null;
  }
};