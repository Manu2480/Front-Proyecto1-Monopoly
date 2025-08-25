export const BoardRenderer = {
  render(container, boardData) {
    container.innerHTML = "";
    const board = document.createElement("div");
    board.className = "monopoly-board";

    // Extraer las casillas del tablero (solo las secciones del tablero)
    const boardSections = ['bottom', 'left', 'top', 'right'];
    let allTiles = [];
    
    boardSections.forEach(section => {
      if (boardData[section]) {
        allTiles = allTiles.concat(boardData[section]);
      }
    });

    console.log("Total de casillas encontradas:", allTiles.length);

    // Crear tablero estilo Monopoly
    allTiles.forEach((tile, index) => {
      const div = document.createElement("div");
      div.className = "tile";
      div.setAttribute('data-position', index);
      
      const name = tile.name || tile.title || `Casilla ${index}`;
      const color = tile.color || '#ffffff';
      
      div.innerHTML = `
        <div class="tile-header" style="background-color: ${color}"></div>
        <span class="tile-name">${name}</span>
      `;
      
      board.appendChild(div);
    });

    container.appendChild(board);
    console.log("Tablero renderizado con", allTiles.length, "casillas");
  }
};