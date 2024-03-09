const ReviewModel = require('../Models/review.model');
const resData = require('../helperFunctions');
class ReviewController{
    static addReview = async (req, res) => {
        try {
            const review = await new ReviewModel({ ...req.body, reviewOwnerId: req.user._id, reviewOwnerName: req.user.userName, reviewOwnerImage: req.user.image});
            await review.save();
            resData(res, 200, true, review, "success adding");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }
    static getReview = async (req, res) => {
        try {
            const review = await ReviewModel.find({ tripId: req.params.id });
            resData(res, 200, true, review, "success get data");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }
}

module.exports = ReviewController;