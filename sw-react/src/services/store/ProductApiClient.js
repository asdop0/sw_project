class ProductApiClient {
    static SERVER_URL = "http://host.docker.internal:8000";
    static API = "/product";
    static LIST = "/list";
    static CATEGORY = "/category";
    static SORT = "/sort";
    static VIEW = "/view";

    //전체 상품 조회
    static getProductList() {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API + ProductApiClient.LIST, {
            method: 'GET'
        });
    } 
    //카테고리에 따른 조회
    static getCategoryList(category_id) {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API + ProductApiClient.CATEGORY + "?category_id=" + category_id, {
            method: 'GET'
        });
    } 
    //카테고리 내에 조건에 따른 조회
    static getSortList(category_id, condition) {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API + ProductApiClient.SORT + "?category_id=" + category_id + "&condition=" + condition, {
            method: 'GET'
        });
    } 
    //상품 상세 정보
    static viewProduct(product_id) {
        return fetch(ProductApiClient.SERVER_URL + ProductApiClient.API + ProductApiClient.VIEW + "?product_id=" + product_id, {
            method: 'GET'
        });
    } 
}

export default ProductApiClient;