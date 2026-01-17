const Game = {
    currentScene: "SCENE_START",
    isStarted: false,

    // [1] 로그인 성공 시 호출 (auth.js에서 실행)
    start() {
        console.log("게임 시작됨");
        const auth = document.getElementById('auth-section');
        const container = document.getElementById('game-container');
        
        if (auth) auth.style.display = 'none'; // 로그인창 숨김
        if (container) container.classList.remove('hidden'); // 게임창 표시
        
        this.isStarted = true;
        this.loadScene(this.currentScene);
    },

    // [2] 장면 로드 (스토리, 월드맵, 전투 구분)
    loadScene(sceneId) {
        this.currentScene = sceneId;
        const data = STORY_FLOW[sceneId];
        
        if (!data) {
            console.error("씬 데이터를 찾을 수 없습니다:", sceneId);
            return;
        }

        const view = document.getElementById('map-view');
        
        // A. 월드맵 화면
        if (data.type === "WORLDMAP") {
            view.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:#1a1a1a;">
                    <h2 style="color:#ffd700; margin-bottom:20px;">${data.content}</h2>
                    <button class="btn" onclick="Game.loadScene('VILLAGE_1')" style="padding:10px 20px; background:#d4af37; border:none; cursor:pointer; font-weight:bold;">평원현 입성</button>
                </div>`;
            this.updateDialogue({ speaker: "알림", content: "월드맵에 도착했습니다." });
            return;
        }

        // B. 일반 스토리/전투 화면 (쿼터뷰 엔진 사용)
        const mapType = (data.type === "BATTLE") ? 'grass' : 'floor';
        Engine.renderMap('map-view', 8, 8, mapType);
        
        if (data.chars) {
            data.chars.forEach(c => Engine.renderCharacter('map-view', c));
        }

        this.updateDialogue(data);
    },

    // [3] 대사창 업데이트 (가독성 보정 필수)
    updateDialogue(data) {
        const speaker = document.getElementById('speaker-tag');
        const content = document.getElementById('content-area');
        const portrait = document.getElementById('speaker-portrait');

        if (speaker) {
            speaker.innerText = data.speaker || "시스템";
            speaker.style.color = "#FFD700"; // 이름은 금색
        }
        if (content) {
            content.innerText = data.content || "";
            content.style.color = "#FFFFFF"; // 대사는 흰색
        }
        if (portrait) {
            if (data.portrait) {
                portrait.src = `assets/${data.portrait}`;
                portrait.classList.remove('hidden');
            } else {
                portrait.classList.add('hidden');
            }
        }
    },

    // [4] 화면 클릭 시 다음 대사로 진행 (가장 중요!)
    handleInteraction() {
        if (!this.isStarted) return;
        
        const data = STORY_FLOW[this.currentScene];
        if (data && data.next) {
            console.log("다음 장면으로 이동:", data.next);
            this.loadScene(data.next);
        } else {
            console.log("다음 장면이 없습니다.");
        }
    }
};