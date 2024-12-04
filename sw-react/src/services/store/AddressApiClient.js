import SignApiClient from "../auth/SignApiClient";

class AddressApiClient {
    static SERVER_URL = "http://localhost:8000";
    static API = "/address";
    static ADD = "/add";
    static MODIFY = "/modify";
    static DELETE = "/delete";
    static LIST = "/list";
    static VIEW = "/view";
    static CHOICE = "/choice";
    static GET_ADDRESS = "/get";
    static TEST = '/test';

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
    //기본 배송지 출력
    static getAddress(accessToken) {
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.GET_ADDRESS, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
        });
    } 
    //엑세스 토큰 재발급 시연용
    static tokenTest() {
        console.log("함수 실행");
        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.TEST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ1c2VyMiIsInJvbGVzIjpbIlJPTEVfVVNFUiJdLCJpYXQiOjE3MzI0OTU3MDcsImV4cCI6MTczMjQ5OTMwN30.J0-8OEXHZNf8yC0OG6sXHm5S45N6IFLDJTCeG8T7_WKj60S3fG7uqzVjKms-1oss"
            },
        }).then(response => {
            if (response.status === 403) {
                console.log("accessToken 만료");
                const refreshToken = localStorage.getItem('refreshToken');
                return SignApiClient.refresh(refreshToken)
                    .then(newAccessToken => {
                        return fetch(AddressApiClient.SERVER_URL + AddressApiClient.API + AddressApiClient.TEST, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-AUTH-TOKEN': newAccessToken.accessToken
                            }
                        });
                    });
                }
            if (!response.ok) {
                return Promise.reject('재발급 실패');
            }
            return response.json();
        }).catch(error => {
            console.error("에러 발생:", error);
            throw error;
        });
    }
}

export default AddressApiClient;