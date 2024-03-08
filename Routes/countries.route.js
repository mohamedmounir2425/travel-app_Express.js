const router = require('express').Router();
const CountryController = require('../Controllers/country.controller');

// GET Methods
router.get('/',CountryController.getCountries);
router.get('/:id',CountryController.getCountryById);

module.exports = router;
