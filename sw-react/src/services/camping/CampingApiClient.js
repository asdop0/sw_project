class CampingApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/campings";

    //전체 리스트 조회
    static getCampingList() {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API, {
            method: 'GET'
        });
    } 
    //지역 캠핑장 조회
    static getDistrictList(district) {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API + "?district=" + district, {
            method: 'GET'
        });
    } 
    //조건에 따른 캠핑장 조회
    static getSortList(district, condition) {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API + "?district=" + district + "&condition=" +condition, {
            method: 'GET'
        });
    } 
    //캠핑장 상세정보
    static viewCamping(camping_id) {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API + "/" +camping_id,  {
            method: 'GET',
        });
    } 
    //캠핑장 검색
    static getSearchCampingList(search) {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API + "?search=" + search, {
            method: 'GET'
        });
    } 
}

export default CampingApiClient;