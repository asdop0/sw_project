class BookmarkApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/cart";
    static ADD = "/add";
    static DELETE = "/delete";
    static LIST = "/list";
    static PAYMENT = "/payment";

    //장바구니 등록
    static addCart(accessToken, product_id, cnt) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.ADD + "?product_id=" + product_id + "&cnt=" + cnt, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    //장바구니 삭제
    static deleteCart(accessToken, cart_id) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.DELETE + "?cart_id=" + cart_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    //장바구니 출력
    static getCartList(accessToken) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //장바구니 구매
    static paymentCart(accessToken) {
        return fetch(BookmarkApiClient.SERVER_URL + BookmarkApiClient.API + BookmarkApiClient.PAYMENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default BookmarkApiClient;