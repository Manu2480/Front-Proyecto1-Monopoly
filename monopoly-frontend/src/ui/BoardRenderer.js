/* posicionamiento del tablero */

export const BoardRenderer = {
  render(container, boardData) {
    container.innerHTML = "";
    const board = document.createElement("div");
    board.className = "monopoly-board";

    // Organizar casillas por secciones del tablero
    const sections = {
      bottom: boardData.bottom || [],
      left: boardData.left || [],
      top: boardData.top || [],
      right: boardData.right || []
    };

    // Crear array de casillas en orden correcto (empezando desde "Salida")
    let orderedTiles = [];
    
    // Bottom row (de derecha a izquierda): posiciones 0-10
    orderedTiles = orderedTiles.concat(sections.bottom.slice().reverse());
    
    // Left column (de abajo a arriba, sin esquina): posiciones 11-19  
    orderedTiles = orderedTiles.concat(sections.left.slice(1, -1).reverse());
    
    // Top row (de izquierda a derecha): posiciones 20-30
    orderedTiles = orderedTiles.concat(sections.top);
    
    // Right column (de arriba a abajo, sin esquinas): posiciones 31-39
    orderedTiles = orderedTiles.concat(sections.right.slice(1, -1));

    console.log("Casillas ordenadas:", orderedTiles.length);

    // Crear grid 11x11
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 11; col++) {
        const cell = document.createElement("div");
        
        // Determinar si es una casilla del borde o centro
        if (this.isBorderCell(row, col)) {
          const position = this.getBoardPosition(row, col);
          const tile = orderedTiles[position];
          
          cell.className = "tile";
          cell.setAttribute('data-position', position);
          
          if (tile) {
            const name = tile.name || tile.title || `Casilla ${position}`;
            const color = tile.color || '#ffffff';
            
            cell.innerHTML = `
              <div class="tile-header" style="background-color: ${color}"></div>
              <span class="tile-name">${name}</span>
            `;
          } else {
            cell.innerHTML = `<span class="tile-name">Casilla ${position}</span>`;
          }
        } else {
          // Celda del centro
          cell.className = "center-area";
        }
        
        board.appendChild(cell);
      }
    }

    container.appendChild(board);
    console.log("Tablero renderizado correctamente");
  },

  // Determinar si una celda está en el borde
  isBorderCell(row, col) {
    return row === 0 || row === 10 || col === 0 || col === 10;
  },

  // Mapear posición del grid a índice del tablero (0-39)
  getBoardPosition(row, col) {
    // Esquina inferior derecha (Salida): posición 0
    if (row === 10 && col === 10) return 0;
    
    // Fila inferior (de derecha a izquierda): posiciones 1-9
    if (row === 10 && col > 0) return 10 - col;
    
    // Esquina inferior izquierda: posición 10
    if (row === 10 && col === 0) return 10;
    
    // Columna izquierda (de abajo a arriba): posiciones 11-19
    if (col === 0 && row > 0) return 10 + (10 - row);
    
    // Esquina superior izquierda: posición 20
    if (row === 0 && col === 0) return 20;
    
    // Fila superior (de izquierda a derecha): posiciones 21-29
    if (row === 0 && col > 0) return 20 + col;
    
    // Esquina superior derecha: posición 30
    if (row === 0 && col === 10) return 30;
    
    // Columna derecha (de arriba a abajo): posiciones 31-39
    if (col === 10 && row > 0) return 30 + row;
    
    return 0;
  }
};