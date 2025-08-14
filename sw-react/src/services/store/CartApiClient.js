class CartApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/store/carts";
    static CHECKOUT = "/checkout";

    //장바구니 등록
    static addCart(accessToken, product_id, cnt) {
        return fetch(CartApiClient.SERVER_URL + CartApiClient.API + "/" + product_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({cnt})
        });
    }
    //장바구니 삭제
    static deleteCart(accessToken, cart_id) {
        return fetch(CartApiClient.SERVER_URL + CartApiClient.API + "/" + cart_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    //장바구니 출력
    static getCartList(accessToken) {
        return fetch(CartApiClient.SERVER_URL + CartApiClient.API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //장바구니 구매
    static paymentCart(accessToken) {
        return fetch(CartApiClient.SERVER_URL + CartApiClient.API + CartApiClient.CHECKOUT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default CartApiClient;