/**
 * YGJ Engine: 쿼터뷰 렌더링 시스템
 */
const Engine = {
    // 1. 설정값: 영걸전 표준 타일 비율 (2:1)
    tileW: 64, 
    tileH: 32,
    originX: 0, // 맵의 중앙 정렬을 위한 오프셋
    originY: 50,

    /**
     * 2. 평면 좌표(row, col)를 쿼터뷰 화면 좌표(x, y)로 변환
     * @param {number} row - 행 (Y축)
     * @param {number} col - 열 (X축)
     */
    getIsoCoords(row, col) {
        return {
            x: (col - row) * (this.tileW / 2),
            y: (col + row) * (this.tileH / 2)
        };
    },

    /**
     * 3. 맵 렌더링 함수
     * @param {string} containerId - 맵이 그려질 HTML 요소 ID
     * @param {number} rows - 가로 타일 수
     * @param {number} cols - 세로 타일 수
     */
    renderMap(containerId, rows, cols) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // 초기화
        this.originX = container.clientWidth / 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const coords = this.getIsoCoords(r, c);
                const tile = document.createElement('div');
                tile.className = 'tile';
                
                // 도트 느낌을 살리기 위해 정수 단위로 배치
                tile.style.left = `${this.originX + coords.x - (this.tileW / 2)}px`;
                tile.style.top = `${this.originY + coords.y}px`;
                
                // 타일 좌표 저장 (나중에 클릭 이벤트용)
                tile.dataset.row = r;
                tile.dataset.col = c;
                
                container.appendChild(tile);
            }
        }
    },

    /**
     * 4. 캐릭터(미소녀 스프라이트) 배치 함수
     * @param {string} containerId - 맵 요소 ID
     * @param {object} charData - 캐릭터 정보 (id, row, col, asset)
     */
    renderCharacter(containerId, charData) {
        const container = document.getElementById(containerId);
        const coords = this.getIsoCoords(charData.row, charData.col);
        
        let charDiv = document.getElementById(charData.id);
        if (!charDiv) {
            charDiv = document.createElement('div');
            charDiv.id = charData.id;
            charDiv.className = 'sprite';
            container.appendChild(charDiv);
        }

        // 도트 캐릭터의 발바닥이 타일 중앙에 오도록 오프셋 조정
        const charW = 48; // 에셋 크기에 맞춰 조절
        const charH = 48;
        
        charDiv.style.left = `${this.originX + coords.x - (charW / 2)}px`;
        charDiv.style.top = `${this.originY + coords.y - (charH - (this.tileH / 2))}px`;
        charDiv.style.backgroundImage = `url('assets/${charData.asset}')`;
        charDiv.style.zIndex = charData.row + charData.col + 10; // 겹침 방지 (Z-Order)
    }
};