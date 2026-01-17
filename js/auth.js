// js/auth.js
const SUPABASE_URL = 'https://ycizbxlqgqguxxkkxugm.supabase.co'; // ID를 포함한 주소 형식
const SUPABASE_KEY = 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe';

// Supabase 클라이언트 초기화
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 회원가입 함수
async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert("가입 실패: " + error.message);
    else alert("가입 성공! 이메일을 확인하세요.");
}

// 로그인 함수
async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("로그인 실패: " + error.message);
    else {
        console.log("로그인 성공:", data.user);
        // 로그인 성공 시 시작 화면 숨기고 게임 시작
        document.getElementById('start-screen').style.display = 'none';
        gameEngine.startNewGame(); 
    }
}