class BoardApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/board/posts";

    //게시글 전체 조회
    static getBoardList() {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API, {
            method: 'GET'
        });
    } 
    //조건에 따른 조회
    static getSortList(sort) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + "?sort=" + sort, {
            method: 'GET'
        });
    } 
    //게시글 상세정보
    static viewBoard(post_id) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + "/" + post_id, {
            method: 'GET'
        });
    } 
    //게시글 추가
    static addBoard(accessToken, title, content) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + "?title=" + title + "&content=" + content, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //게시글 삭제
    static deleteBoard(accessToken, post_id) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + "/" + post_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //게시글 검색
    static getSearchBoardList(search) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + "?search=" + search, {
            method: 'GET'
        });
    } 
}

export default BoardApiClient;