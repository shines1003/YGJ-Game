const Game = {
    currentScene: "SCENE_START",
    isStarted: false,

    start() {
        this.isStarted = true;
        document.getElementById('game-container').classList.remove('hidden');
        this.loadScene(this.currentScene);
    },

    loadScene(sceneId) {
        this.currentScene = sceneId;
        const data = STORY_FLOW[sceneId];
        if (!data) return;

        // 맵 그리기
        Engine.renderMap('map-view', 10, 10, data.type === 'BATTLE' ? 'grass' : 'floor');

        // 대사창 가독성 강제 주입
        const speaker = document.getElementById('speaker-tag');
        const content = document.getElementById('content-area');
        
        if (speaker) {
            speaker.innerText = data.speaker || "시스템";
            speaker.style.color = "#FFD700"; // 금색 강제
            speaker.style.fontWeight = "bold";
        }
        if (content) {
            content.innerText = data.content || "";
            content.style.color = "#FFFFFF"; // 흰색 강제
        }
    },

    // 화면 클릭 시 다음 장면으로
    handleInteraction() {
        if (!this.isStarted) return;
        const data = STORY_FLOW[this.currentScene];
        if (data && data.next) {
            this.loadScene(data.next);
        }
    }
};