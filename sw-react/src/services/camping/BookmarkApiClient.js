class BookmarkApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/campingBookmark";
    static LIST = "/list";
    static ADD = "/add";
    static DELETE = "/delete";
    static COUNT = "/count";
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
    static addBookmark(accessToken, camping_id) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.ADD + "?camping_id=" + camping_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    //즐겨찾기 삭제
    static deleteBookmark(accessToken, camping_id) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.DELETE + "?camping_id=" + camping_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    // 북마크 개수 조회
    static getBookmarkCount(camping_id) {
        return fetch(`${BookmarkApiClient.SERVER_URL}${BookmarkApiClient.API}${BookmarkApiClient.COUNT}?camping_id=${camping_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
}

export default BookmarkApiClient;