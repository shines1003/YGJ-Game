const Auth = {
    // 본인의 Supabase URL과 Anon Key를 꼭 넣으세요
    client: supabase.createClient('https://ycizbxlqgqguxxkkxugm.supabase.co', 'sb_publishable_R-XE2JfZaSK0Zfkn_6wfHw_5kwl5kSe'),

    async signUp() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;
        const { data, error } = await this.client.auth.signUp({ email, password });
        if (error) alert("가입 실패: " + error.message);
        else alert("가입 성공! 이메일을 확인해주세요.");
    },

    async signIn() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('pw').value;
        const { data, error } = await this.client.auth.signInWithPassword({ email, password });
        
        if (error) {
            alert("로그인 실패: " + error.message);
        } else {
            // 성공 시 로그인창 숨기고 게임 시작
            document.getElementById('auth-section').classList.add('hidden');
            Game.start();
        }
    }
};