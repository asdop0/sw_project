class CommentApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/comment";
    static ADD = "/add";
    static DELETE = "/delete";

    //댓글 등록
    static addComment(accessToken, board_id, i_comment) {
        return fetch(CommentApiClient.SERVER_URL + CommentApiClient.API + CommentApiClient.ADD + "?board_id=" + board_id + "&i_comment=" + i_comment, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //댓글 삭제
    static deleteComment(accessToken, comment_id) {
        return fetch(CommentApiClient.SERVER_URL + CommentApiClient.API + CommentApiClient.DELETE + "?comment_id=" + comment_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default CommentApiClient;