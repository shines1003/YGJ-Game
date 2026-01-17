const Engine = {
    tileW: 64, tileH: 32,
    originX: 0, originY: 100,

    getIsoCoords(row, col) {
        return {
            x: (col - row) * (this.tileW / 2),
            y: (col + row) * (this.tileH / 2)
        };
    },

    renderMap(containerId, rows, cols, type = 'grass') {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        this.originX = container.clientWidth / 2;

        const floor = document.createElement('div');
        floor.style.position = 'relative';
        container.appendChild(floor);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const coords = this.getIsoCoords(r, c);
                const tile = document.createElement('div');
                tile.className = 'tile';
                // 2D 도트 맵 느낌을 위해 실제 이미지 연결
                tile.style.backgroundImage = type === 'grass' ? "url('assets/tile_grass.png')" : "url('assets/tile_floor.png')";
                tile.style.left = `${this.originX + coords.x - (this.tileW / 2)}px`;
                tile.style.top = `${this.originY + coords.y}px`;
                floor.appendChild(tile);
            }
        }
    }
};