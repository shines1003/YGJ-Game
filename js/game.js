/**
 * YGJ Online: 통합 게임 컨트롤러
 */
const Game = {
    currentScene: "SCENE_START",
    isGameStarted: false,

    /**
     * 1. 게임 시작 (Auth.js에서 로그인 성공 후 호출)
     */
    start() {
        console.log("게임 시작 로직 실행...");
        this.isGameStarted = true;
        
        // 로그인 UI 숨기기 및 게임 UI 표시
        const authSection = document.getElementById('auth-section');
        const gameContainer = document.getElementById('game-container');
        
        if (authSection) authSection.classList.add('hidden');
        if (gameContainer) gameContainer.classList.remove('hidden');

        // 첫 번째 씬 로드
        this.loadScene(this.currentScene);
    },

    /**
     * 2. 장면(Scene) 전환 로직
     */
    loadScene(sceneId) {
        this.currentScene = sceneId;
        const data = STORY_FLOW[sceneId];

        // 데이터가 없을 경우 예외 처리
        if (!data) {
            console.error(`씬 데이터를 찾을 수 없습니다: ${sceneId}`);
            this.updateDialogue({ speaker: "시스템", content: "데이터 로딩 오류가 발생했습니다." });
            return;
        }

        const view = document.getElementById('map-view');
        const sidePanel = document.getElementById('side-panel');

        // [A] 월드맵 타입 처리
        if (data.type === "WORLDMAP") {
            if (sidePanel) sidePanel.classList.add('hidden');
            view.innerHTML = `
                <div class="worldmap-container" style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:#1a1a1a;">
                    <h1 style="color:#ffd700; margin-bottom:20px;">${data.content}</h1>
                    <button class="btn" onclick="Game.loadScene('VILLAGE_1')" style="padding:15px 30px; font-size:1.2em;">평원현 입성</button>
                </div>`;
            this.updateDialogue({ speaker: "알림", content: "월드맵에서 이동할 목적지를 선택하세요." });
            return;
        }

        // [B] 전투/마을 타입 처리 (쿼터뷰 렌더링)
        if (view) {
            const mapStyle = (data.type === "BATTLE") ? 'grass' : 'floor';
            Engine.renderMap('map-view', 10, 10, mapStyle);

            // 캐릭터 배치
            if (data.chars) {
                data.chars.forEach(char => Engine.renderCharacter('map-view', char));
            }

            // 전투 시에만 사이드바 표시
            if (data.type === "BATTLE" && sidePanel) {
                sidePanel.classList.remove('hidden');
                this.updateUnitInfo(CHARACTERS.YUBI); // 기본 유비 정보 표시
            } else if (sidePanel) {
                sidePanel.classList.add('hidden');
            }
        }

        // 대사창 업데이트
        this.updateDialogue(data);
    },

    /**
     * 3. 대사창 및 초상화 업데이트
     */
    updateDialogue(data) {
        const speakerTag = document.getElementById('speaker-tag');
        const contentArea = document.getElementById('content-area');
        const portrait = document.getElementById('speaker-portrait');

        // 텍스트 업데이트 (undefined 방지)
        if (speakerTag) speakerTag.innerText = data.speaker || "시스템";
        if (contentArea) contentArea.innerText = data.content || "대사가 없습니다.";

        // 초상화 처리
        if (portrait) {
            if (data.portrait) {
                portrait.src = `assets/${data.portrait}`;
                portrait.classList.remove('hidden');
            } else {
                portrait.classList.add('hidden');
            }
        }
    },

    /**
     * 4. 부대 정보 업데이트 (사이드바)
     */
    updateUnitInfo(char) {
        const nameEl = document.getElementById('info-name');
        const classEl = document.getElementById('info-class');
        const hpFill = document.getElementById('info-hp-fill');

        if (nameEl) nameEl.innerText = char.name;
        if (classEl) classEl.innerText = char.class;
        if (hpFill) hpFill.style.width = "100%"; // 테스트용 풀피
    },

    /**
     * 5. 상호작용 (대사창 클릭 등)
     */
    handleInteraction() {
        if (!this.isGameStarted) return;

        const data = STORY_FLOW[this.currentScene];
        if (data && data.next) {
            this.loadScene(data.next);
        }
    }
};

// 페이지 로드 시 초기화 확인용 (로그인 전까지 대기)
window.onload = () => {
    console.log("YGJ Engine Ready...");
};