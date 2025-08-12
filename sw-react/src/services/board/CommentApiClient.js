class CommentApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/board/comments";

    //댓글 등록
    static addComment(accessToken, post_id, i_comment) {
        return fetch(CommentApiClient.SERVER_URL + CommentApiClient.API + "/" + post_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({i_comment})
        });
    } 
    //댓글 삭제
    static deleteComment(accessToken, comment_id) {
        return fetch(CommentApiClient.SERVER_URL + CommentApiClient.API + "/" + comment_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default CommentApiClient;