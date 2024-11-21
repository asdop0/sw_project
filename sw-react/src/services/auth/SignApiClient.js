class SignApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/sign-api";
    static IN = "/sign-in";
    static UP = "/sign-up";
    static OUT = "/sign-out";
    static DELETE = "/delete";
    static REFRESH = "/refresh";
    static UID = "/uidCheck";
    static NICKNAME = "/nicknameCheck";

    //로그인
    static signIn(id, password) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.IN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password})
        });
    } 
    //회원가입
    static signUp(id, password, name, nickname, email) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.UP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password, name, nickname, email})
        });
    }

    //로그아웃
    static signOut(refreshToken) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.OUT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': refreshToken
            }
        });
    }

    //회원탈퇴
    static delete(refreshToken) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.DELETE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': refreshToken
            }
        });
    }

    //AccessToken 재발급
    static refresh(refreshToken) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.REFRESH, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': refreshToken
            }
        });
    }

    //아이디 중복 체크
    static uidCheck(uid) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.UID + "?uid=" + uid, {
            method: 'POST'
        });
    }

    //닉네임 중복 체크
    static nicknameCheck(nickname) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.NICKNAME + "?nickname=" + nickname, {
            method: 'POST'
        });
    }

    //로그인 체크
    static loginCheck() {
        const isLoggedIn = localStorage.getItem("login");
        if(isLoggedIn === 'true') {
            return;
        } else {
            window.location.replace("/login"); 
        }
    }
}

export default SignApiClient;