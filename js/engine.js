/**
 * Graphic Engine (Map & Unit Renderer)
 * 역할: 타일맵 생성, 캐릭터 스프라이트 렌더링, 레이아웃 관리
 */
const Engine = {
    // [1] 타일맵 그리기 (전투/마을 구분)
    renderMap(containerId, rows, cols, type) {
        const view = document.getElementById(containerId);
        if (!view) return;

        view.innerHTML = ""; // 기존 맵 초기화
        view.style.position = "relative";
        view.style.display = "grid";
        view.style.gridTemplateColumns = `repeat(${cols}, 40px)`; // 40px 격자
        view.style.gridTemplateRows = `repeat(${rows}, 40px)`;
        view.style.gap = "1px";
        view.style.padding = "10px";
        view.style.backgroundColor = (type === 'grass') ? '#2d5a27' : '#333'; // 배경색

        // 격자 타일 생성
        for (let i = 0; i < rows * cols; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.style.width = '40px';
            tile.style.height = '40px';
            tile.style.border = '1px solid rgba(255,255,255,0.05)';
            view.appendChild(tile);
        }
    },

    // [2] 맵 위에 캐릭터(유닛) 렌더링
    renderCharacter(containerId, charData) {
        const view = document.getElementById(containerId);
        if (!view) return;

        const charElement = document.createElement('div');
        charElement.className = 'unit';
        charElement.style.position = 'absolute';
        charElement.style.left = (charData.x * 40 + 15) + 'px';
        charElement.style.top = (charData.y * 40 + 15) + 'px';
        charElement.style.width = '32px';
        charElement.style.height = '32px';
        
        // 캐릭터 스프라이트 이미지가 있다면 적용, 없으면 도트로 표시
        if (charData.sprite) {
            charElement.style.backgroundImage = `url('assets/${charData.sprite}')`;
            charElement.style.backgroundSize = 'contain';
        } else {
            charElement.style.backgroundColor = charData.color || '#ff0000';
            charElement.style.borderRadius = '50%';
        }

        view.appendChild(charElement);
    },

    // [3] 월드맵 전용 렌더링
    renderWorldMap(containerId, content) {
        const view = document.getElementById(containerId);
        if (!view) return;

        view.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:url('assets/worldmap_bg.png') center/cover;">
                <h2 style="color:#ffd700; text-shadow:2px 2px 4px #000;">${content}</h2>
                <button class="btn" onclick="Game.loadScene('VILLAGE_1')" style="margin-top:20px;">입성하기</button>
            </div>`;
    }
};