class AddressApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/category";
    static ADD = "/add";
    static MODIFY = "/modify";
    static DELETE = "/delete";
    static LIST = "/list";
    static VIEW = "/view";
    static CHOICE = "/choice";

    //배송지 추가
    static addAddress(accessToken, name, addr, phonenumber, req) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.ADD + "?name=" + name + "&addr=" + addr + "&phonenumber=" + phonenumber + "&req=" + req, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //배송지 수정
    static modifyAddress(accessToken, address_id, name, addr, phonenumber, req) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.MODIFY + "?address_id=" + address_id + "&name=" + name + "&addr=" + addr + "&phonenumber=" + phonenumber + "&req=" + req, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //배송지 삭제
    static deleteAddress(accessToken, address_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.DELETE + "?address_id=" + address_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //배송지 리스트 조회
    static getAddressList(accessToken) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.LIST, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //배송지 상세 정보
    static viewAddress(accessToken, address_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.VIEW + "?address_id=" + address_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //기본 배송지로 변경
    static choiceAddress(accessToken, address_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.CHOICE + "?address_id=" + address_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
}

export default AddressApiClient;