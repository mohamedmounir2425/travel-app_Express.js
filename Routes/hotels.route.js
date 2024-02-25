const router = require('express').Router();
const HotelController = require('../Controllers/hotel.controller');

// GET Methods
router.get('/',HotelController.getHotels);
router.get('/:id',HotelController.getHotelById);

// Post Methods
router.post('/',HotelController.createHotel);

module.exports = router;
