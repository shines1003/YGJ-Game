const Engine = {
    renderMap(containerId, rows, cols, type) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = ""; // 이전 맵 삭제
        
        // 맵 배경색 설정 (grass면 초록, floor면 회색)
        container.style.backgroundColor = (type === 'grass') ? '#2d5a27' : '#444';

        for (let i = 0; i < rows * cols; i++) {
            const tile = document.createElement('div');
            tile.style.width = '40px';
            tile.style.height = '40px';
            tile.style.border = '1px solid rgba(255,255,255,0.1)';
            tile.style.display = 'inline-block';
            container.appendChild(tile);
        }
    },
    renderCharacter(containerId, charData) {
        // 캐릭터 스프라이트 생성 로직 (필요시 추가)
    }
};