export const BoardRenderer = {
  render(container, boardData) {
    container.innerHTML = "";
    const grid = document.createElement("div");
    grid.className = "board-grid";

    // Convertir a array si viene como objeto
    let tiles = Array.isArray(boardData) ? boardData : Object.values(boardData);
    
    tiles.forEach(tile => {
      const div = document.createElement("div");
      div.className = "tile";
      div.innerHTML = `<span>${tile.name || tile.title || 'Sin nombre'}</span>`;
      grid.appendChild(div);
    });

    container.appendChild(grid);
    console.log("Tablero renderizado con", tiles.length, "casillas");
  }
};