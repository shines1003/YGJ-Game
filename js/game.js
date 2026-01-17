const Game = {
    currentScene: "SCENE_START",
    isStarted: false,

    start() {
        // 로그인창 숨기고 게임창 보이기
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        this.isStarted = true;
        this.loadScene(this.currentScene);
    },

    loadScene(sceneId) {
        this.currentScene = sceneId;
        const data = STORY_FLOW[sceneId];
        if (!data) return;

        // 맵 그리기
        Engine.renderMap('map-view', 8, 8, 'floor');
        if (data.chars) {
            data.chars.forEach(c => Engine.renderCharacter('map-view', c));
        }

        // 대사 업데이트
        document.getElementById('speaker-tag').innerText = data.speaker || "시스템";
        document.getElementById('content-area').innerText = data.content || "";
    },

    handleInteraction() {
        if (!this.isStarted) return;
        const data = STORY_FLOW[this.currentScene];
        if (data && data.next) {
            this.loadScene(data.next);
        }
    }
};