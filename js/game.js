const Game = {
    currentScene: "SCENE_START",
    isStarted: false,

    start() {
        this.isStarted = true;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        this.loadScene(this.currentScene);
    },

    loadScene(sceneId) {
        this.currentScene = sceneId;
        const data = STORY_FLOW[sceneId];
        if (!data) return;

        // 1. 대사 및 색상 업데이트
        const speakerTag = document.getElementById('speaker-tag');
        const contentArea = document.getElementById('content-area');
        
        speakerTag.innerText = data.speaker || "시스템";
        contentArea.innerText = data.content || "";
        
        // 2. 맵 그리기 (engine.js 호출)
        if (typeof Engine !== 'undefined') {
            Engine.renderMap('map-view', 10, 12, 'floor');
        }

        // 3. 사이드바 정보 업데이트
        if (data.speaker === "유비") {
            document.getElementById('info-name').innerText = "유비";
            document.getElementById('info-class').innerText = "군웅";
            document.getElementById('info-hp').innerText = "100/100";
        }
    },

    // 이 함수가 클릭 시 다음 대사로 넘겨주는 핵심입니다!
    handleInteraction() {
        const data = STORY_FLOW[this.currentScene];
        if (data && data.next) {
            this.loadScene(data.next);
        } else if (data && data.type === "WORLDMAP") {
            alert("월드맵으로 이동합니다.");
        }
    }
};