const router = require('express').Router();
const ReviewController = require('../Controllers/review.controller');
const { auth } = require('../Middlewares/auth');

router.post('/addReview', auth, ReviewController.addReview);
router.get('/getReview/:id', ReviewController.getReview);

module.exports = router;