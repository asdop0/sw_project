class SignApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/auth/sign";
    static IN = "/sign-in";
    static UP = "/sign-up";
    static OUT = "/sign-out";
    static DELETE = "/users";
    static REFRESH = "/refresh";
    static UID = "/users/check-id";
    static NICKNAME = "/users/check-nickname";

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
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': refreshToken
            }
        });
    }

    //회원탈퇴
    static delete(refreshToken) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.DELETE, {
            method: 'DELETE',
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
        }).then(response => {
            if (!response.ok) {
                console.error("리프레시 토큰 갱신 실패, 로그인 페이지로 이동합니다.");
                localStorage.setItem('login', 'false');
                localStorage.setItem('accessToken', null);
                localStorage.setItem('refreshToken', null);
                localStorage.setItem('role', null);
                localStorage.setItem('nickname', null);
                window.location.replace("/login");
                return Promise.reject('리프레시 토큰 갱신 실패'); 
            }
            return response.json();  // 응답 JSON을 반환
        })
        .then(data => {
            const accessToken = data;
            if (!accessToken) {
                return Promise.reject('엑세스 토큰이 없습니다.');
            }
            console.log("accessToken 재발급 성공"); 
            console.log(accessToken);
            return accessToken;
        })
        .catch(error => {
            console.error("리프레시 토큰 처리 중 오류:", error);
            throw error;
        });
    }

    //아이디 중복 체크
    static uidCheck(uid) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.UID + "?uid=" + uid, {
            method: 'GET'
        });
    }

    //닉네임 중복 체크
    static nicknameCheck(nickname) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.NICKNAME + "?nickname=" + nickname, {
            method: 'GET'
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