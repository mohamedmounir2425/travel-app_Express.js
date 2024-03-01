const Users = require('../Controllers/user.controller');
const Countries = require('../Controllers/country.controller');
const Hotels = require('../Controllers/hotel.controller');
const Trips = require('../Controllers/trip.controller');
const router = require('express').Router();
const authAdmin = require('../Middlewares/auth').authAdmin;

// Login
router.post('/login', Users.loginAdmin);
// COUNTRIES
router.post('/countries',authAdmin ,Countries.createCountry);
router.put('/countries/:id',authAdmin, Countries.updateCountry);
router.delete('/countries/:id',authAdmin, Countries.deleteCountry);


// HOTELS
router.post('/hotels',authAdmin, Hotels.createHotel);
router.put('/hotels/:id',authAdmin, Hotels.updateHotel);
router.delete('/hotels/:id',authAdmin, Hotels.deleteHotel);

// TRIPS
router.post('/trips',authAdmin, Trips.addTrip);
router.put('/trips/:id',authAdmin, Trips.updateTrip);
router.delete('/trips/:id',authAdmin, Trips.deleteTrip);

// USERS
router.get('/users',authAdmin, Users.getAllUsers);
router.delete('/users/:id',authAdmin, Users.delUser);
router.put('/setAdmin/:id',authAdmin, Users.setUserAdmin);

module.exports = router;
