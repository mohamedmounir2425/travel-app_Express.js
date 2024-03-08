const Admin = require('../Controllers/admin.controller');
const router = require('express').Router();
const authAdmin = require('../Middlewares/auth').authAdmin;

// Admin Data
router.get('/adminData',authAdmin, Admin.getAdminData);
// Login
router.post('/login', Admin.loginAdmin);

// COUNTRIES
router.post('/countries',authAdmin ,Admin.createCountry);
router.put('/countries/:id',authAdmin, Admin.updateCountry);
router.delete('/countries/:id',authAdmin, Admin.deleteCountry);


// HOTELS
router.post('/hotels',authAdmin, Admin.createHotel);
router.put('/hotels/:id',authAdmin, Admin.updateHotel);
router.delete('/hotels/:id',authAdmin, Admin.deleteHotel);

// TRIPS
router.post('/trips',authAdmin, Admin.addTrip);
router.put('/trips/:id',authAdmin, Admin.updateTrip);
router.delete('/trips/:id',authAdmin, Admin.deleteTrip);

// USERS
router.get('/users',authAdmin, Admin.getAllUsers);
router.delete('/users/:id',authAdmin, Admin.delUser);
router.put('/setAdmin/:id',authAdmin, Admin.setUserAdmin);

module.exports = router;
