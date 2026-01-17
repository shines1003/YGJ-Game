/**
 * YGJ Online: 게임 데이터 및 상수 설정
 */

// 1. 미소녀 캐릭터 데이터 (뽑기 및 능력치 시스템용)
const CHARACTERS = {
    "YUBI": {
        id: "YUBI",
        name: "유비 (도원결의 ver.)",
        rarity: "SSR",
        class: "기병",
        asset: "yubi.png", // assets/yubi.png 로드
        baseStats: { force: 75, intel: 80, command: 90 },
        description: "촉한의 건국자. 자비롭고 포용력이 넓은 미소녀 리더."
    },
    "KANU": {
        id: "KANU",
        name: "관우 (청룡언월 ver.)",
        rarity: "UR",
        class: "기병",
        asset: "kanu.png",
        baseStats: { force: 97, intel: 78, command: 88 },
        description: "의리의 화신. 압도적인 무력을 자랑하는 미소녀 무장."
    },
    "JANBI": {
        id: "JANBI",
        name: "장비 (장판파 ver.)",
        rarity: "SSR",
        class: "기병",
        asset: "janbi.png",
        baseStats: { force: 98, intel: 30, command: 70 },
        description: "호쾌한 성격의 미소녀. 전장의 분위기 메이커."
    },
    "JOJO": {
        id: "JOJO",
        name: "조조 (난세의 간웅 ver.)",
        rarity: "UR",
        class: "군주",
        asset: "jojo.png",
        baseStats: { force: 82, intel: 91, command: 98 },
        description: "위나라의 기틀을 닦은 패왕색 미소녀 전략가."
    }
};

// 2. 스토리 분기 데이터 (확장 가능하도록 설계)
const STORY_FLOW = {
    "SCENE_START": {
        speaker: "유비",
        content: "드디어 때가 왔군요. 우리 미소녀 의용군이 나설 차례예요!",
        next: "CHOICE_1"
    },
    "CHOICE_1": {
        type: "SELECT",
        question: "동탁의 폭거를 어떻게 막으시겠습니까?",
        options: [
            { text: "정면 돌파한다 (사수관 전투)", next: "BATTLE_SASUGWAN" },
            { text: "지략을 짜서 기습한다 (분기 스토리)", next: "SCENE_STRATEGY" }
        ]
    },
    "BATTLE_SASUGWAN": {
        type: "BATTLE",
        mapId: "MAP_01",
        enemies: ["HWAYUNG", "SOLDIER_A"],
        reward: "GOLD_500"
    }
};

// 3. 뽑기(Gacha) 확률 설정
const GACHA_CONFIG = {
    CHANCE_UR: 0.01,  // 1%
    CHANCE_SSR: 0.05, // 5%
    CHANCE_SR: 0.15,  // 15%
    COST_PER_PULL: 300
};

// 4. 병과 상성 테이블 (기획 4.2 반영)
const CLASS_MODIFIERS = {
    "기병": { "보병": 1.2, "궁병": 1.0, "기병": 1.0 },
    "보병": { "궁병": 1.2, "기병": 0.8, "보병": 1.0 },
    "궁병": { "기병": 1.2, "보병": 0.8, "궁병": 1.0 }
};