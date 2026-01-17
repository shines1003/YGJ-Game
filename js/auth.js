const Auth = {
    // 1. Supabase 설정 (본인의 정보로 꼭 확인하세요!)
    // index.html에서 로드한 supabase 라이브러리를 사용합니다.
    client: supabase.createClient('https://ycizbxlqgqguxxkkxugm.supabase.co', 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe'),

    async signIn() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;

        try {
            const { data, error } = await this.client.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;

            alert("로그인 성공! 미소녀 영걸전의 세계에 오신 것을 환영합니다.");
            
            // 로그인창을 숨기고 게임을 시작합니다.
            Game.start(); 
        } catch (error) {
            console.error("로그인 에러:", error.message);
            alert("로그인 실패: " + error.message);
        }
    },

    async signUp() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;

        try {
            const { data, error } = await this.client.auth.signUp({
                email: email,
                password: password,
            });

            if (error) throw error;
            alert("회원가입 신청 완료! 이메일을 확인해 주세요.");
        } catch (error) {
            alert("회원가입 실패: " + error.message);
        }
    }
};