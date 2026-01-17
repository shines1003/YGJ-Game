/**
 * Auth System (Supabase 연동)
 * 역할: 사용자 인증 및 로그인 후 게임 엔진(Game) 호출
 */
const Auth = {
    // 1. Supabase 초기화 (index.html에서 로드한 supabase 활용)
    // 아래 URL과 KEY는 본인의 프로젝트 설정 값으로 반드시 변경해야 합니다.
    client: typeof supabase !== 'undefined' ? supabase.createClient('[https://ycizbxlqgqguxxkkxugm.supabase.co](https://ycizbxlqgqguxxkkxugm.supabase.co/)', 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe') : null,

    // 2. 로그인 함수
    async signIn() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;

        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        try {
            console.log("시스템: 로그인 시도 중...");
            const { data, error } = await this.client.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                alert("로그인 실패: " + error.message);
                console.error("로그인 에러:", error.message);
            } else {
                console.log("로그인 성공:", data.user.email);
                // 로그인 성공 시 Game 객체의 메뉴 호출
                if (typeof Game !== 'undefined' && Game.showMenu) {
                    Game.showMenu(); 
                } else {
                    console.error("오류: game.js가 로드되지 않았거나 showMenu 함수가 없습니다.");
                }
            }
        } catch (err) {
            console.error("치명적 에러:", err);
        }
    },

    // 3. 회원가입 함수 (누락되었던 가입하기 버튼 기능)
    async signUp() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;

        if (!email || !password) {
            alert("가입할 이메일과 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const { data, error } = await this.client.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                alert("가입 실패: " + error.message);
            } else {
                alert("가입 성공! 메일함을 확인하여 인증을 완료해주세요.");
            }
        } catch (err) {
            console.error("가입 에러:", err);
        }
    },

    // 4. 로그아웃 (필요 시 호출)
    async signOut() {
        await this.client.auth.signOut();
        location.reload(); // 첫 화면으로 새로고침
    }
};