class CampingApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/camping";
    static LIST = "/list";
    static DISTRICT = "/district";
    static SORT = "/sort";
    static VIEW = "/view";

    //전체 리스트 조회
    static getCampingList() {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API + CampingApiClient.LIST, {
            method: 'GET'
        });
    } 
    //지역 캠핑장 조회
    static getDistrictList(district) {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API + CampingApiClient.DISTRICT + "?district=" + district, {
            method: 'GET'
        });
    } 
    //조건에 따른 캠핑장 조회
    static getSortList(id, password) {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API + CampingApiClient.IN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password})
        });
    } 
    //캠핑장 상세정보
    static viewCamping(id, password) {
        return fetch(CampingApiClient.SERVER_URL + CampingApiClient.API + CampingApiClient.IN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, password})
        });
    } 
}

export default CampingApiClient;