class MessageApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/message";
    static WRITE = "/write";
    static RECEIVED = "/received";
    static SENT = "/sent";
    static RECEIVED_DELETE = "/received/delete";
    static SENT_DELETE = "/sent/delete";

    //쪽지 작성
    static writeMessage(accessToken, title, content, receive) {
        return fetch(MessageApiClient.SERVER_URL + MessageApiClient.API + MessageApiClient.WRITE + "?title=" + title + "&content=" + content + "&receive=" + receive, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
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
        return fetch(MessageApiClient.SERVER_URL + MessageApiClient.API + MessageApiClient.RECEIVED_DELETE + "?message_id=" + message_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //보낸 쪽지 삭제
    static deleteSentMessage(accessToken, message_id) {
        return fetch(MessageApiClient.SERVER_URL + MessageApiClient.API + MessageApiClient.SENT_DELETE + "?message_id=" + message_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default MessageApiClient;