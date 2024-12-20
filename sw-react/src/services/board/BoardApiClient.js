import SignApiClient from "../auth/SignApiClient";

class BoardApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/board";
    static LIST = "/list";
    static SORT = "/sort";
    static VIEW = "/view";
    static ADD = "/add";
    static DELETE = "/delete";
    static SEARCH = "/search";

    //게시글 전체 조회
    static getBoardList() {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + BoardApiClient.LIST, {
            method: 'GET'
        });
    } 
    //조건에 따른 조회
    static getSortList(condition) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + BoardApiClient.SORT + "?condition=" + condition, {
            method: 'GET'
        });
    } 
    //게시글 상세정보
    static viewBoard(board_id) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + BoardApiClient.VIEW + "?board_id=" + board_id, {
            method: 'GET'
        });
    } 
    //게시글 추가
    static addBoard(accessToken, title, content) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + BoardApiClient.ADD + "?title=" + title + "&content=" + content, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //게시글 삭제
    static deleteBoard(accessToken, board_id) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + BoardApiClient.DELETE + "?board_id=" + board_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //게시글 검색
    static getSearchBoardList(search) {
        return fetch(BoardApiClient.SERVER_URL + BoardApiClient.API + BoardApiClient.SEARCH + "?search=" + search, {
            method: 'GET'
        });
    } 
}

export default BoardApiClient;