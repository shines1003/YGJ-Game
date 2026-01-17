/**
 * YGJ Online: 게임 흐름 제어 (Scene Manager)
 */
const Game = {
    currentScene: "SCENE_START",
    
    init() {
        console.log("게임 엔진 초기화...");
        this.loadScene(this.currentScene);
    },

    /**
     * 1. 장면 로드 함수
     * @param {string} sceneId - constants.js의 STORY_FLOW 키값
     */
    loadScene(sceneId) {
        const data = STORY_FLOW[sceneId];
        if (!data) return;

        this.currentScene = sceneId;

        // 장면 타입에 따른 분기 처리
        if (data.type === "BATTLE") {
            this.startBattle(data);
        } else if (data.type === "SELECT") {
            this.showSelection(data);
        } else {
            this.showDialogue(data);
        }
    },

    /**
     * 2. 대사창 업데이트 (1.2 스토리)
     */
    showDialogue(data) {
        document.getElementById('speaker').innerText = data.speaker;
        document.getElementById('content').innerText = data.content;
        
        // 캐릭터가 있다면 렌더링 (engine.js 활용)
        if (data.chars) {
            Engine.renderMap('map-view', 6, 6); // 스토리용 작은 맵
            data.chars.forEach(c => Engine.renderCharacter('map-view', c));
        }
    },

    /**
     * 3. 선택지 UI 생성 (스토리 분기)
     */
    showSelection(data) {
        const contentBox = document.getElementById('content');
        contentBox.innerHTML = `<p>${data.question}</p>`;
        
        data.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn';
            btn.style.width = 'auto';
            btn.style.marginRight = '10px';
            btn.innerText = opt.text;
            btn.onclick = () => this.loadScene(opt.next);
            contentBox.appendChild(btn);
        });
    },

    /**
     * 4. 전투 개시 (1.6 전투)
     */
    startBattle(data) {
        // 전투용 큰 맵 렌더링
        Engine.renderMap('map-view', 10, 10);
        
        // 아군(유비)과 적군 배치
        Engine.renderCharacter('map-view', {
            id: 'char_yubi', row: 5, col: 2, asset: CHARACTERS.YUBI.asset
        });
        
        document.getElementById('speaker').innerText = "시스템";
        document.getElementById('content').innerText = "전투가 시작되었습니다!";
    }
};

// 페이지 로드 시 게임 시작
window.onload = () => Game.init();