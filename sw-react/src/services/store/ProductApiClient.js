class ProductApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/store/products";
    static CATEGORY = "/category";

    //전체 상품 조회
    static getProductList() {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API, {
            method: 'GET'
        });
    } 
    //카테고리에 따른 조회
    static getCategoryList(category_id) {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API + ProductApiClient.CATEGORY + "/" + category_id, {
            method: 'GET'
        });
    } 
    //카테고리 내에 조건에 따른 조회
    static getSortList(category_id, condition) {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API + ProductApiClient.CATEGORY + "/" + category_id + "?sort=" + sort, {
            method: 'GET'
        });
    } 
    //상품 상세 정보
    static viewProduct(product_id) {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API + "/" + product_id, {
            method: 'GET'
        });
    } 
    //상품 검색
    static getSearchProductList(search) {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API + "?search=" + search, {
            method: 'GET'
        });
    } 
}

export default ProductApiClient;