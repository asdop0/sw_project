class AdminApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/productAdmin";
    static ADD = "/add";
    static MODIFY = "/modify";
    static DELETE = "/delete";
    static REVIEW = "/delete/review";
    static ORDERLIST = "/orderList";
    static PENDINGLIST = "/pendingList";
    static APPROVAL = "/approval";

    //상품 등록
    static addProduct(accessToken, name, description, price, cnt, category) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.ADD, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({name, description, price, cnt, category})
        });
    } 
    //상품 수정
    static modifyProduct(accessToken, product_id, name, description, price, cnt, category) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.MODIFY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({product_id, name, description, price, cnt, category})
        });
    } 
    //상품 삭제
    static deleteProduct(accessToken, product_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.DELETE + "?product_id=" + product_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //후기 삭제
    static deleteReview(accessToken, review_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.REVIEW + "?review_id=" + review_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //모든 사용자 주문 내역 출력
    static getFullOrderList(accessToken) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.ORDERLIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //결제 대기 목록 출력
    static getPendingList(accessToken) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.PENDINGLIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
    //결제 완료
    static approvalOrder(accessToken, order_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + AdminApiClient.APPROVAL + "?order_id=" + order_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    } 
}

export default AdminApiClient;