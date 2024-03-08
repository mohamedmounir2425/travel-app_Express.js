const router = require('express').Router();
const TripsController = require('../Controllers/trip.controller');
const { auth } = require('../Middlewares/auth');

// GET Methods
router.get('/',TripsController.allTrips);
router.get('/:id',TripsController.tripData);
router.get('/book/:id',auth,TripsController.bookTrip);


module.exports = router;
