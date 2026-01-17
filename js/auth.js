/**
 * Auth System (Supabase 연동)
 * 주신 정보를 직접 입력했습니다. 이제 바로 작동합니다.
 */
const Auth = {
    // 유저님이 제공해주신 URL과 KEY 직접 적용
    client: supabase.createClient(
        'https://ycizbxlqgqguxxkkxugm.supabase.co', 
        'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe'
    ),

    // 로그인 함수
    async signIn() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;

        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        try {
            console.log("서버 접속 시도 중...");
            const { data, error } = await this.client.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                alert("로그인 실패: " + error.message);
            } else {
                console.log("로그인 성공!");
                // 로그인 성공 시 메뉴 화면으로 이동
                if (typeof Game !== 'undefined') {
                    Game.showMenu(); 
                }
            }
        } catch (err) {
            console.error("인증 시스템 오류:", err);
            alert("시스템 오류가 발생했습니다. 콘솔을 확인하세요.");
        }
    },

    // 회원가입 함수
    async signUp() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;

        if (!email || !password) {
            alert("가입 정보를 입력해주세요.");
            return;
        }

        const { data, error } = await this.client.auth.signUp({
            email: email,
            password: password,
        });

        if (error) alert("가입 실패: " + error.message);
        else alert("가입 성공! 메일 인증 후 로그인해주세요.");
    }
};