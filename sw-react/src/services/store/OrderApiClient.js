class OrderApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/order";
    static ADD = "/add";
    static CANCLE = "/cancel";
    static DELETE = "/delete";
    static LIST = "/list";
    static VIEW = "/view";
    static LIST_CANCEL = "/list/cencel";
    static VIEW_CANCEL = "/view/cencel";

    //주문 및 상세 등록
    static addOrder(accessToken, product_id, cnt) {
        return fetch(OrderApiClient.SERVER_URL + OrderApiClient.API + OrderApiClient.ADD + "?product_id=" + product_id + "&cnt=" + cnt, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //주문 취소
    static cancelOrder(accessToken, order_id, reason) {
        return fetch(OrderApiClient.SERVER_URL + OrderApiClient.API + OrderApiClient.CANCLE + "?order_id=" + order_id + "&reason" + reason, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //주문 내역 삭제
    static deleteOrder(accessToken, order_id) {
        return fetch(OrderApiClient.SERVER_URL + OrderApiClient.API + OrderApiClient.DELETE + "?order_id=" + order_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //주문 내역 출력
    static getOrderList(accessToken) {
        return fetch(OrderApiClient.SERVER_URL + OrderApiClient.API + OrderApiClient.LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //주문 상세 출력
    static viewOrderDetail(accessToken, order_id) {
        return fetch(OrderApiClient.SERVER_URL + OrderApiClient.API + OrderApiClient.VIEW + "?order_id=" + order_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //전체 취소 내역 출력
    static getCencelList(accessToken) {
        return fetch(OrderApiClient.SERVER_URL + OrderApiClient.API + OrderApiClient.LIST_CANCEL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    }
    //취소 상세 출력
    static viewCencelDetail(accessToken, order_id) {
        return fetch(OrderApiClient.SERVER_URL + OrderApiClient.API + OrderApiClient.VIEW_CANCEL + "?order_id=" + order_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
}

export default OrderApiClient;