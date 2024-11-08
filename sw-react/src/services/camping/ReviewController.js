class ReviewController {
    static SERVER_URL = "http://localhost:8000";
    static API = "/campingReview";
    static ADD = "/add";
    static DELETE = "/delete";

    //후기 등록
    static addReview(accessToken, camping_id, content) {
        return fetch(ReviewController.SERVER_URL + ReviewController.API + ReviewController.ADD + "?camping_id=" + camping_id + "&content=" + content, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
    //후기 삭제
    static deleteReview(accessToken, review_id) {
        return fetch(ReviewController.SERVER_URL + ReviewController.API + ReviewController.DELETE + "?review_id=" + review_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-AUTH-TOKEN': accessToken
            }
        });
    }
}

export default ReviewController;