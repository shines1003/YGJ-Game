const Game = {
    currentScene: "SCENE_START",
    isGameActive: false,

    // 1. 로그인 성공 직후 (auth.js에서 호출)
    showMenu() {
        // 모든 섹션을 일단 숨기고 메뉴만 표시
        document.getElementById('auth-section').classList.add('hidden');
        document.getElementById('game-container').classList.add('hidden');
        document.getElementById('menu-section').classList.remove('hidden');
    },

    // 2. '시작하기' 버튼 클릭 시
    initNewGame() {
        document.getElementById('menu-section').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        this.isGameActive = true;
        this.loadScene("SCENE_START");
    },

    // 3. 장면 로드 및 대사 출력
    loadScene(sceneId) {
        this.currentScene = sceneId;
        const data = STORY_FLOW[sceneId];
        
        if (!data) return;

        // 대사창 가독성 보정
        const speaker = document.getElementById('speaker-tag');
        const content = document.getElementById('content-area');
        
        if (speaker) speaker.innerText = data.speaker || "시스템";
        if (content) content.innerText = data.content || "";
        
        // 맵 렌더링 (engine.js 활용)
        if (typeof Engine !== 'undefined') {
            Engine.renderMap('map-view', 10, 10, 'floor');
        }
    },

    // 4. 대사창 클릭 시 실행 (가장 중요!)
    handleInteraction() {
        if (!this.isGameActive) return;
        
        const data = STORY_FLOW[this.currentScene];
        if (data && data.next) {
            this.loadScene(data.next);
        }
    }
};