/* Posicionamiento del tablero */

export const BoardRenderer = {
  render(container, boardData) {
    container.innerHTML = "";
    const board = document.createElement("div");
    board.className = "monopoly-board";

    // Debug: ver estructura del backend
    console.log("Secciones disponibles:", Object.keys(boardData));
    console.log("Bottom:", boardData.bottom?.length || 0);
    console.log("Left:", boardData.left?.length || 0);
    console.log("Top:", boardData.top?.length || 0);
    console.log("Right:", boardData.right?.length || 0);
    
    // Debug detallado de las esquinas
    console.log("\n=== DEBUG ESQUINAS ===");
    console.log("Bottom primera casilla:", boardData.bottom?.[0]?.name || "N/A");
    console.log("Bottom última casilla:", boardData.bottom?.[boardData.bottom?.length-1]?.name || "N/A");
    console.log("Left primera casilla:", boardData.left?.[0]?.name || "N/A");
    console.log("Left última casilla:", boardData.left?.[boardData.left?.length-1]?.name || "N/A");
    console.log("Top primera casilla:", boardData.top?.[0]?.name || "N/A");
    console.log("Top última casilla:", boardData.top?.[boardData.top?.length-1]?.name || "N/A");
    console.log("Right primera casilla:", boardData.right?.[0]?.name || "N/A");
    console.log("Right última casilla:", boardData.right?.[boardData.right?.length-1]?.name || "N/A");
    console.log("========================\n");

    // Organizar casillas por secciones del tablero
    const sections = {
      bottom: boardData.bottom || [],
      left: boardData.left || [],
      top: boardData.top || [],
      right: boardData.right || []
    };

    // Crear array de casillas en orden correcto (40 posiciones: 0-39)
    let orderedTiles = new Array(40);
    
    // Bottom row (posiciones 0-10): de derecha a izquierda
    // Bottom tiene 10 casillas pero necesitamos 11 posiciones (0-10)
    // La esquina faltante (posición 0) está en Left
    if (sections.bottom.length > 0) {
      sections.bottom.reverse().forEach((tile, index) => {
        orderedTiles[1 + index] = tile; // posiciones 1-10 (10 casillas)
      });
    }
    
    // Esquina posición 0: primera casilla de Left
    if (sections.left.length > 0) {
      orderedTiles[0] = sections.left[0]; // "Cárcel / Solo de visita"
    }
    
    // Left column (posiciones 11-19): casillas del medio de Left
    if (sections.left.length >= 11) {
      const leftMiddle = sections.left.slice(1, 10); // índices 1-9 (9 casillas)
      leftMiddle.reverse().forEach((tile, index) => {
        orderedTiles[11 + index] = tile; // posiciones 11-19
      });
    }
    
    // Esquina posición 20: última casilla de Left
    if (sections.left.length >= 11) {
      orderedTiles[20] = sections.left[sections.left.length - 1]; // "Parqueo Gratis"
    }
    
    // Top row (posiciones 21-30): casillas de Top
    // Top tiene 10 casillas para posiciones 21-30
    if (sections.top.length > 0) {
      sections.top.forEach((tile, index) => {
        orderedTiles[21 + index] = tile; // posiciones 21-30
      });
    }
    
    // Right column (posiciones 31-39): todas las casillas de Right
    if (sections.right.length > 0) {
      sections.right.forEach((tile, index) => {
        orderedTiles[31 + index] = tile; // posiciones 31-39
      });
    }

    // Debug mejorado
    console.log("Casillas totales organizadas:", orderedTiles.filter(t => t).length);
    console.log("Total esperado: 40");
    
    const missingPositions = [];
    orderedTiles.forEach((tile, index) => {
      if (!tile) missingPositions.push(index);
    });
    console.log("Casillas faltantes en posiciones:", missingPositions);
    
    // Mostrar distribución por sección
    console.log("Distribución:");
    console.log("- Esquina 0:", orderedTiles[0]?.name || "FALTA");
    console.log("- Bottom (1-10):", orderedTiles.slice(1, 11).filter(t => t).length + "/10");
    console.log("- Left (11-19):", orderedTiles.slice(11, 20).filter(t => t).length + "/9");
    console.log("- Esquina 20:", orderedTiles[20]?.name || "FALTA");
    console.log("- Top (21-30):", orderedTiles.slice(21, 31).filter(t => t).length + "/10");
    console.log("- Right (31-39):", orderedTiles.slice(31, 40).filter(t => t).length + "/9");

    // Crear grid 11x11 con posiciones exactas
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 11; col++) {
        const cell = document.createElement("div");
        
        if (this.isBorderCell(row, col)) {
          const position = this.getBoardPosition(row, col);
          const tile = orderedTiles[position];
          
          cell.className = "tile";
          cell.setAttribute('data-position', position);
          
          if (tile) {
            const name = tile.name || tile.title || `Pos ${position}`;
            const color = tile.color || '#ffffff';
            
            cell.innerHTML = `
              <div class="tile-header" style="background-color: ${color}"></div>
              <span class="tile-name">${name}</span>
            `;
          } else {
            // Casilla faltante - mostrar en rojo para debug
            cell.innerHTML = `
              <div class="tile-header" style="background-color: #ff5722"></div>
              <span class="tile-name" style="color: red; font-size: 0.6rem;">Falta ${position}</span>
            `;
          }
        } else {
          cell.className = "center-area";
        }
        
        board.appendChild(cell);
      }
    }

    container.appendChild(board);
    console.log("Tablero renderizado - Grid 11x11 creado");
  },

  isBorderCell(row, col) {
    return row === 0 || row === 10 || col === 0 || col === 10;
  },

  getBoardPosition(row, col) {
    // Mapeo exacto para 40 casillas (0-39)
    
    // Fila inferior (row=10): posiciones 0-10 (derecha a izquierda)
    if (row === 10) {
      return 10 - col;
    }
    
    // Columna izquierda (col=0): posiciones 11-19 (abajo a arriba, sin esquinas)
    if (col === 0 && row < 10 && row > 0) {
      return 10 + (10 - row);
    }
    
    // Fila superior (row=0): posiciones 20-30 (izquierda a derecha)
    if (row === 0) {
      return 20 + col;
    }
    
    // Columna derecha (col=10): posiciones 31-39 (arriba a abajo, sin esquinas)
    if (col === 10 && row > 0 && row < 10) {
      return 30 + row;
    }
    
    return 0;
  }
};