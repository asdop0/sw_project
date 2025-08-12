class AdminApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/board/admin";
    static Board = "/posts";
    static Comment = "/comments";

    //게시글 삭제
    static deleteBoard(accessToken, post_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.Board + "/" + post_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //댓글 삭제
    static deleteComment(accessToken, comment_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.Comment + "?comment_id=" + comment_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default AdminApiClient;