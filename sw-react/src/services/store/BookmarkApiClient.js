class BookmarkApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/productBookmark";
    static LIST = "/list";
    static ADD = "/add";
    static DELETE = "/delete";

    //즐겨찾기 리스트 조회
    static getBookmarkList(accessToken) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //즐겨찾기 추가
    static addBookmark(accessToken, product_id) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.ADD + "?product_id=" + product_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    //즐겨찾기 삭제
    static deleteBookmark(accessToken, product_id) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.DELETE + "?product_id=" + product_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
}

export default BookmarkApiClient;