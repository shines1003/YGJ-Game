const STORY_FLOW = {
    "SCENE_START": {
        speaker: "시스템",
        content: "영걸전 온라인에 오신 것을 환영합니다. 클릭하여 시작하세요.",
        next: "SCENE_1"
    },
    "SCENE_1": {
        speaker: "유비",
        content: "드디어 때가 왔군. 우리 미소녀 의용군이 나설 차례예요!",
        portrait: "yubi_face.png", // assets 폴더에 실제 파일이 있어야 함
        next: "SCENE_2"
    },
    "SCENE_2": {
        speaker: "시스템",
        content: "스토리가 끝났습니다. 월드맵으로 이동합니다.",
        type: "WORLDMAP"
    }
};

const CHARACTERS = {
    YUBI: { name: "유비", class: "군웅", hp: 100, maxHp: 100 }
};