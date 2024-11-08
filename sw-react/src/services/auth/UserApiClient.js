class UserApiClient {   
    static SERVER_URL = "http://localhost:8000";
    static API = "/user";
    static INFO = "/info";
    static MODIFY = "/modify";
    static FIND = "/find";
    static PASSWORD = "/modify/password";
    
    //유저 정보 조회
    static getUserInfo(accessToken) {
        return fetch(UserApiClient.SERVER_URL + UserApiClient.API + UserApiClient.INFO, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 

    //닉네임 변경
    static modifyNickname(accessToken, nickname) {
        return fetch(UserApiClient.SERVER_URL + UserApiClient.API + UserApiClient.MODIFY + "?nickname=" + nickname, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 

    //아이디 찾기
    static findById(name, nickname) {
        return fetch(UserApiClient.SERVER_URL + UserApiClient.API + UserApiClient.FIND + "?nickname=" + nickname + "&name=" + name, {
            method: 'GET',
        });
    } 

    //비밀번호 변경
    static modifyPassword(refreshToken, password, newPassword) {
        return fetch(UserApiClient.SERVER_URL + UserApiClient.API + UserApiClient.PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': refreshToken
            },
            body: JSON.stringify({password, newPassword})
        });
    } 
}

export default UserApiClient;