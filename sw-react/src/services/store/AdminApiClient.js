class AdminApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/store/admin";
    static REVIEW = "/reviews";
    static ORDERS = "/orders";
    static PENDING = "/pending";

    //상품 등록
    static addProduct(accessToken, name, description, price, category) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({name, description, price, category})
        });
    } 
    //상품 수정
    static modifyProduct(accessToken, product_id, name, description, price, category) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + "/" + product_id, {
            method: 'PATHC',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({'id': product_id, name, description, price, category})
        });
    } 
    //상품 삭제
    static deleteProduct(accessToken, product_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + "/" + product_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //후기 삭제
    static deleteReview(accessToken, review_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.REVIEW + "/" + review_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //모든 사용자 주문 내역 출력
    static getFullOrderList(accessToken) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.ORDERS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //날짜별 모든 사용자 주문 내역 출력
    static getOrdersByDate(accessToken, date) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.ORDERS + "?date=" + date, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //결제 대기 목록 출력
    static getPendingList(accessToken) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.ORDERS + AdminApiClient.PENDING, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //결제 완료
    static approvalOrder(accessToken, order_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.ORDERS + "/" + order_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default AdminApiClient;