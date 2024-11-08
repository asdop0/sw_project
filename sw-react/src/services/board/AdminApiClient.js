class AdminApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/boardAdmin";
    static Board = "/deleteBoard";
    static Comment = "/deleteComment";

    //게시글 삭제
    static deleteBoard(accessToken, board_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.DELETE + "?board_id=" + board_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //댓글 삭제
    static deleteComment(accessToken, comment_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.REVIEW + "?comment_id=" + comment_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default AdminApiClient;