class CategoryApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/store/category/admin";

    //카테고리 추가
    static addCategory(accessToken, name) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({name})
        });
    } 
    //카테고리 수정
    static modifyCategory(accessToken, category_id, name) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + "/" + category_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({name})
        });
    } 
    //카테고리 삭제
    static deleteCategory(accessToken, category_id) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + "/" + category_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //카테고리 리스트 조회
    static getCategoryList(accessToken) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
}

export default CategoryApiClient;