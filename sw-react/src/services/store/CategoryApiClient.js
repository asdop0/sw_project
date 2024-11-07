class CategoryApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/product";
    static LIST = "/list";
    static CATEGORY = "/category";
    static SORT = "/sort";
    static VIEW = "/view";

    //전체 상품 조회 미완
    static getProductList() {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + CategoryApiClient.LIST, {
            method: 'GET'
        });
    } 
    //카테고리에 따른 조회 미완
    static getCategoryList(category_id) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + CategoryApiClient.CATEGORY + "?category_id=" + category_id, {
            method: 'GET'
        });
    } 
    //카테고리 내에 조건에 따른 조회 미완
    static getSortList(category_id, condition) {
        return fetch(CategoryApiClient.SERVER_URL + CategoryApiClient.API + CategoryApiClient.SORT + "?category_id=" + category_id + "&condition=" + condition, {
            method: 'GET'
        });
    } 
}

export default CategoryApiClient;