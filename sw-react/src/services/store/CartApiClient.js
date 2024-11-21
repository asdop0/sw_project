class CartApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/cart";
    static ADD = "/add";
    static DELETE = "/delete";
    static LIST = "/list";
    static PAYMENT = "/payment";

    //장바구니 등록
    static addCart(accessToken, product_id, cnt) {
        return fetch(CartApiClient.SERVER_URL + CartApiClient.API + CartApiClient.ADD + "?product_id=" + product_id + "&cnt=" + cnt, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    //장바구니 삭제
    static deleteCart(accessToken, cart_id) {
        return fetch(CartApiClient.SERVER_URL + CartApiClient.API + CartApiClient.DELETE + "?cart_id=" + cart_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    //장바구니 출력
    static getCartList(accessToken) {
        return fetch(CartApiClient.SERVER_URL + CartApiClient.API + CartApiClient.LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //장바구니 구매
    static paymentCart(accessToken) {
        return fetch(CartApiClient.SERVER_URL + CartApiClient.API + CartApiClient.PAYMENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default CartApiClient;