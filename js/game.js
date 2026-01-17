const Game = {
    currentScene: "SCENE_START",

    // 로그인 성공 시 호출됨
    start() {
        document.getElementById('auth-section').classList.add('hidden');
        this.loadScene(this.currentScene);
    },

    loadScene(sceneId) {
        this.currentScene = sceneId;
        const data = STORY_FLOW[sceneId];
        const view = document.getElementById('map-view');

        // 1. 월드맵 화면 처리
        if (data.type === "WORLDMAP") {
            view.innerHTML = `
                <div class="worldmap-overlay" style="text-align:center; padding-top:100px;">
                    <h2 style="color:#d4af37;">${data.content}</h2>
                    <button class="btn" onclick="Game.loadScene('VILLAGE_1')">평원현 입성</button>
                </div>`;
            this.updateDialogue({ speaker: "시스템", content: "월드맵에 도착했습니다." });
            return;
        }

        // 2. 쿼터뷰 맵 렌더링 (마을/전투/스토리 공통)
        const mapType = (data.type === "BATTLE") ? 'grass' : 'floor';
        Engine.renderMap('map-view', 8, 8, mapType);

        // 3. 캐릭터 배치
        if (data.chars) {
            data.chars.forEach(c => Engine.renderCharacter('map-view', c));
        }

        this.updateDialogue(data);
    },

    updateDialogue(data) {
        document.getElementById('speaker-tag').innerText = data.speaker || "";
        document.getElementById('content-area').innerText = data.content;
        const portrait = document.getElementById('speaker-portrait');
        
        if (data.portrait) {
            portrait.src = `assets/${data.portrait}`;
            portrait.classList.remove('hidden');
        } else {
            portrait.classList.add('hidden');
        }
    },

    handleInteraction() {
        const data = STORY_FLOW[this.currentScene];
        if (data && data.next) {
            this.loadScene(data.next);
        }
    }
};