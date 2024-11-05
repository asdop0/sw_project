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
    //회원가입 id, password, name, nickname, email
    static signUp(id, password, name, nickname, email) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.UP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password, name, nickname, email})
        });
    }

    static signOut() {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.OUT + "?userId=" + userId);
    }

    static delete() {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.DELETE + "?userId=" + userId);
    }

    static refresh() {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.REFRESH + "?userId=" + userId);
    }

    static uidCheck(uid) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.UID + "?uid=" + uid);
    }

    static nicknameCheck(nickname) {
        return fetch(SignApiClient.SERVER_URL + SignApiClient.API + SignApiClient.NICKNAME + "?nickname=" + nickname);
    }
}

export default SignApiClient;