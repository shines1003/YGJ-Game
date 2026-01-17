const Game = {
    currentScene: "SCENE_START",

    start() {
        console.log("게임 시작");
        // [1] 로그인 UI 강제 제거 및 레이아웃 정리
        const auth = document.getElementById('auth-section');
        const container = document.getElementById('game-container');
        if (auth) auth.style.display = 'none';
        if (container) {
            container.classList.remove('hidden');
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.backgroundColor = '#000'; // 배경은 무조건 검정
        }
        this.loadScene(this.currentScene);
    },

    loadScene(sceneId) {
        this.currentScene = sceneId;
        const data = STORY_FLOW[sceneId];
        if (!data) return;

        // [2] 맵 렌더링 호출
        Engine.renderMap('map-view', 8, 8, data.type === 'BATTLE' ? 'grass' : 'floor');
        
        // [3] 대사 업데이트 (가독성 강제 주입)
        this.updateDialogue(data);
    },

    updateDialogue(data) {
        const speaker = document.getElementById('speaker-tag');
        const content = document.getElementById('content-area');
        const msgWindow = document.getElementById('message-window');

        // 메시지창 배경과 글자색 강제 설정 (시퍼런 화면 방지)
        if (msgWindow) {
            msgWindow.style.backgroundColor = '#000040'; // 진남색
            msgWindow.style.borderTop = '3px solid #d4af37'; // 금색 테두리
            msgWindow.style.padding = '20px';
            msgWindow.style.display = 'block';
        }

        if (speaker) {
            speaker.innerText = data.speaker || "시스템";
            speaker.style.color = "#FFD700"; // 이름은 무조건 금색
            speaker.style.fontSize = "20px";
            speaker.style.fontWeight = "bold";
            speaker.style.marginBottom = "10px";
        }

        if (content) {
            content.innerText = data.content || "";
            content.style.color = "#FFFFFF"; // 대사는 무조건 흰색
            content.style.fontSize = "18px";
            content.style.lineHeight = "1.6";
        }
    },

    handleInteraction() {
        const data = STORY_FLOW[this.currentScene];
        if (data && data.next) this.loadScene(data.next);
    }
};