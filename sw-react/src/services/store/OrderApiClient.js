class AddressApiClient {
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
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.ADD + "?product_id=" + product_id + "&cnt=" + cnt, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //주문 취소
    static cancelOrder(accessToken, order_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.CANCLE + "?order_id=" + order_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //주문 내역 삭제
    static deleteOrder(accessToken, order_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.DELETE + "?order_id=" + order_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //전체 주문 내역 출력
    static getOrderList(accessToken) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //주문 상세 출력
    static viewOrderDetail(accessToken, order_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.VIEW + "?order_id=" + order_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //전체 취소 내역 출력
    static getCencelList(accessToken) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.LIST_CANCEL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    }
    //취소 상세 출력
    static viewCencelDetail(accessToken, order_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.VIEW_CANCEL + "?order_id=" + order_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
}

export default AddressApiClient;