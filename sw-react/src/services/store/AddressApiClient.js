import SignApiClient from "../auth/SignApiClient";

class AddressApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/address";
    static DEFAULT = "/default";

    //배송지 추가
    static addAddress(accessToken, name, addr, phonenumber, req) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({name, addr, phonenumber, req, 'choice': "O"})
        });
    } 
    //배송지 수정
    static modifyAddress(accessToken, address_id, name, addr, phonenumber, req) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + "/" + address_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({ name, addr, phonenumber, req})
        });
    } 
    //배송지 삭제
    static deleteAddress(accessToken, address_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + "/" + address_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //배송지 리스트 조회
    static getAddressList(accessToken) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //배송지 상세 정보
    static viewAddress(accessToken, address_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + "/" + address_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //기본 배송지로 변경
    static choiceAddress(accessToken, address_id) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.DEFAULT + "/" + address_id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //기본 배송지 출력
    static getAddress(accessToken) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.DEFAULT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
}

export default AddressApiClient;