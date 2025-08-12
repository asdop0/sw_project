class MessageApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/board/messages";
    static RECEIVED = "/received";
    static SENT = "/sent";

    //쪽지 작성
    static writeMessage(accessToken, title, content, receive) {
        return fetch(MessageApiClient.SERVER_URL + MessageApiClient.API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({title, content, receive})
        });
    } 
    //받은 쪽지함 조회
    static getReceivedMessage(accessToken) {
        return fetch(MessageApiClient.SERVER_URL + MessageApiClient.API + MessageApiClient.RECEIVED, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //보낸 쪽지함 조회
    static getSentMessage(accessToken) {
        return fetch(MessageApiClient.SERVER_URL + MessageApiClient.API + MessageApiClient.SENT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //받은 쪽지 삭제
    static deleteReceivedMessage(accessToken, message_id) {
        return fetch(MessageApiClient.SERVER_URL + MessageApiClient.API + MessageApiClient.RECEIVED + "/" + message_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //보낸 쪽지 삭제
    static deleteSentMessage(accessToken, message_id) {
        return fetch(MessageApiClient.SERVER_URL + MessageApiClient.API + MessageApiClient.SENT + "/" + message_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default MessageApiClient;