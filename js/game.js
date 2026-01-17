const Game = {
    init() {
        // 첫 시작: 스토리 장면
        this.loadScene("SCENE_START");
    },

    loadScene(sceneId) {
        const data = STORY_FLOW[sceneId];
        const view = document.getElementById('map-view');
        
        if (data.type === "WORLDMAP") {
            // 월드맵 UI 출력
            view.innerHTML = `
                <div class="worldmap-ui">
                    <h2>천하 월드맵</h2>
                    <button class="btn" onclick="Game.loadScene('VILLAGE_1')">평원현 입성</button>
                </div>`;
        } else if (data.type === "BATTLE") {
            // 전투 화면 렌더링
            Engine.renderMap('map-view', 10, 10, 'grass');
            Engine.renderCharacter('map-view', { id:'yubi', row:5, col:2, asset:'yubi_sprite.png' });
            document.getElementById('side-panel').classList.remove('hidden');
        } else {
            // 기본 스토리/마을 화면
            Engine.renderMap('map-view', 8, 8, 'floor');
            this.updateDialogue(data);
        }
    },

    updateDialogue(data) {
        document.getElementById('speaker-tag').innerText = data.speaker || "시스템";
        document.getElementById('content-area').innerText = data.content;
        
        // 초상화 기능 추가
        const portrait = document.getElementById('speaker-portrait');
        if (data.portrait) {
            portrait.src = `assets/${data.portrait}`;
            portrait.classList.remove('hidden');
        } else {
            portrait.classList.add('hidden');
        }
    },

    handleInteraction() {
        // 클릭 시 다음 씬으로 (constants.js의 next 참조)
        const currentData = STORY_FLOW[this.currentScene];
        if (currentData && currentData.next) {
            this.loadScene(currentData.next);
        }
    }
};