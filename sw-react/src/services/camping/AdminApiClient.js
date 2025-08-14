class AdminApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/camping/admin";
    static REVIEW = "/review";

    //캠핑장 등록
    static addCamping(accessToken, name, address, district, homepage, latitude, longitude, phonenumber) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({name, address, district, homepage, latitude, longitude, phonenumber})
        });
    } 
    //캠핑장 정보 수정
    static modifyCamping(accessToken, camping_id, name, address, district, homepage, latitude, longitude, phonenumber) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + "/" + camping_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({id, name, address, district, homepage, latitude, longitude, phonenumber})
        });
    } 
    //캠핑장 삭제
    static deleteCamping(accessToken, camping_id) {
        return fetch(AdminApiClient.SERVER_URL + AdminApiClient.API + "/" + camping_id, {
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
}

export default AdminApiClient;