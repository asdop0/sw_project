class CategoryApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/category";
    static ADD = "/add";
    static MODIFY = "/modify";
    static DELETE = "/delete";
    static LIST = "/list";

    //카테고리 추가
    static addCategory(accessToken, name) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + CategoryApiClient.ADD + "?name=" + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //카테고리 수정
    static modifyCategory(accessToken, category_id, name) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + CategoryApiClient.MODIFY + "?category_id=" + category_id + "&name=" + name, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //카테고리 삭제
    static deleteCategory(accessToken, category_id) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + CategoryApiClient.DELETE + "?category_id=" + category_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //카테고리 리스트 조회
    static getCategoryList(accessToken) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + CategoryApiClient.LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
}

export default CategoryApiClient;