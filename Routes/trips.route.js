const router = require('express').Router();
const TripsController = require('../Controllers/trip.controller');

// GET Methods
router.get('/',TripsController.allTrips);
router.get('/:id',TripsController.tripData);
router.get('/book/:id',TripsController.bookTrip);

// Post Methods
router.post('/',TripsController.addTrip);


module.exports = router;
