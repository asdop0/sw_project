class UserApiClient {   
    static SERVER_URL = "http://localhost:8000";
    static API = "/user";
    static INFO = "/info";
    static MODIFY = "/modify";
    static FIND = "/find";
    static PASSWORD = "/modify/password";
    
    //유저 정보 조회 미완
    static getUserInfo(id, password) {
        return fetch(UserApiClient.SERVER_URL + UserApiClient.API + UserApiClient.INFO, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password})
        });
    } 

    //유저 정보 수정 미완
    static modifyUserInfo(id, password) {
        return fetch(UserApiClient.SERVER_URL + UserApiClient.API + UserApiClient.MODIFY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password})
        });
    } 

    //아이디 찾기
    static findById(name, nickname) {
        return fetch(UserApiClient.SERVER_URL + UserApiClient.API + UserApiClient.FIND + "?nickname=" + nickname + "&name=" + name, {
            method: 'GET',
        });
    } 

    //비밀번호 변경 미완
    static modifyPassword(password, newPassword) {
        return fetch(UserApiClient.SERVER_URL + UserApiClient.API + UserApiClient.PASSWORD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password})
        });
    } 
}

export default UserApiClient;