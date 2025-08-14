class ReviewController {
    static SERVER_URL = "http://localhost:8000";
    static API = "/store/reviews";

    //후기 등록
    static addReview(accessToken, product_id, content) {
        return fetch(ReviewController.SERVER_URL + ReviewController.API + "/" + product_id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            },
            body: JSON.stringify({content})
        });
    }
    //후기 삭제
    static deleteReview(accessToken, review_id) {
        return fetch(ReviewController.SERVER_URL + ReviewController.API + "/" + review_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
}

export default ReviewController;