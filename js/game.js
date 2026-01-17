/**
 * Game Control Tower
 * 역할: 화면 전환, 스토리 로드, 유저 클릭 상호작용 제어
 */
const Game = {
    currentScene: "SCENE_START",
    isGameActive: false, // 게임 본편 실행 여부

    // [1] 로그인 성공 시 호출 (auth.js에서 이 함수를 불러야 함)
    showMenu() {
        console.log("시스템: 메뉴 화면으로 전환합니다.");
        
        // 모든 섹션 제어
        const authSection = document.getElementById('auth-section');
        const menuSection = document.getElementById('menu-section');
        const gameContainer = document.getElementById('game-container');

        if (authSection) authSection.classList.add('hidden');
        if (gameContainer) gameContainer.classList.add('hidden');
        
        if (menuSection) {
            menuSection.classList.remove('hidden');
            // 스타일이 깨질 경우를 대비해 flex 강제 적용
            menuSection.style.display = 'flex'; 
        } else {
            console.error("오류: menu-section 요소를 찾을 수 없습니다.");
        }
    },

    // [2] '시작하기' 버튼 클릭 시 호출
    initNewGame() {
        console.log("시스템: 새로운 게임을 시작합니다.");
        
        const menuSection = document.getElementById('menu-section');
        const gameContainer = document.getElementById('game-container');

        if (menuSection) menuSection.classList.add('hidden');
        if (gameContainer) {
            gameContainer.classList.remove('hidden');
            gameContainer.style.display = 'block'; // 레이아웃 유지
        }

        this.isGameActive = true;
        this.loadScene("SCENE_START"); // constants.js의 첫 장면 로드
    },

    // [3] 장면(Scene) 데이터 로드 및 화면 출력
    loadScene(sceneId) {
        if (typeof STORY_FLOW === 'undefined') {
            console.error("오류: constants.js가 로드되지 않았습니다.");
            return;
        }

        const data = STORY_FLOW[sceneId];
        if (!data) {
            console.error(`오류: ${sceneId} 데이터를 찾을 수 없습니다.`);
            return;
        }

        this.currentScene = sceneId;

        // UI 요소 업데이트
        const speakerTag = document.getElementById('speaker-tag');
        const contentArea = document.getElementById('content-area');
        const infoName = document.getElementById('info-name');

        if (speakerTag) {
            speakerTag.innerText = data.speaker || "시스템";
            speakerTag.style.color = "#FFD700"; // 금색 고정
        }
        if (contentArea) {
            contentArea.innerText = data.content || "";
            contentArea.style.color = "#FFFFFF"; // 흰색 고정
        }

        // 유비 등장 시 사이드바 정보 업데이트
        if (data.speaker === "유비" && infoName) {
            infoName.innerText = "유비";
        }

        // 맵 렌더링 (engine.js 활용)
        try {
            if (typeof Engine !== 'undefined' && Engine.renderMap) {
                // 장면 타입에 따라 배경색 변경 (예: BATTLE이면 grass)
                const mapType = data.type === "BATTLE" ? "grass" : "floor";
                Engine.renderMap('map-view', 10, 10, mapType);
            }
        } catch (error) {
            console.warn("지도 렌더링 중 오류 발생:", error);
        }
    },

    // [4] 대사창 클릭 시 다음 장면으로 이동
    handleInteraction() {
        if (!this.isGameActive) return;

        const currentData = STORY_FLOW[this.currentScene];
        if (currentData && currentData.next) {
            this.loadScene(currentData.next);
        } else if (currentData && currentData.type === "WORLDMAP") {
            console.log("시스템: 월드맵으로 이동합니다.");
            // 월드맵 이동 로직 추가 가능
        }
    },

    // [5] '불러오기' 버튼 클릭 시 (미구현 방어 코드)
    loadSavedGame() {
        alert("저장된 데이터가 없습니다. '시작하기'를 눌러주세요.");
    }
};