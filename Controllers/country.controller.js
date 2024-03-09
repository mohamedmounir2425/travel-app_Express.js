const CountryModel = require('../Models/country.model')
const {resData} = require('../helperFunctions')

class CountryController {
    static async getCountries(req, res) {
        try {
            if (req.query.countryName) {
                const country = await CountryModel.findOne({ countryName: req.query.countryName });
                await country.populate("hotels");
                await country.populate("trips");
                const data = {
                    country,
                    hotels: country.hotels,
                    trips: country.trips
                }
                resData(res, 200, true, data, 'Country Data')
                return
            }
            const countries = await CountryModel.aggregate([
                {
                    $lookup: {
                        from: 'trips', // Name of the Trip collection
                        localField: '_id',
                        foreignField: 'countryId',
                        as: 'trips'
                    }
                },
                {
                    $lookup: {
                        from: 'hotels', // Name of the Hotel collection
                        localField: '_id',
                        foreignField: 'hotelCountry.countryId',
                        as: 'hotels'
                    }
                },
                {
                    $addFields: {
                        tripsNumber: { $size: '$trips' }, // Count the number of trips
                        hotelsNumber: { $size: '$hotels' } // Count the number of hotels
                    }
                },
                {
                    $project: {
                        _id: 1,
                        countryName: 1,
                        countryDescription: 1,
                        countryImg: 1,
                        tripsNumber: 1,
                        hotelsNumber: 1
                    }
                }
            ]);

            resData(res, 200, true, countries, 'All Countries');
        } catch (error) {
            resData(res, 500, false, [], error.message);
        }
    }
    static async getCountryById(req, res) {
        try {
            const country = await CountryModel.findOne({ _id: req.params.id })
            await country.populate("hotels");
            await country.populate("trips");
            const data = {
                country,
                hotels: country.hotels,
                trips: country.trips
            }
            resData(res, 200, true, data, 'Country Data')
        } catch (error) {
            resData(res, 500, false, {}, error.message)
        }
    }
}

module.exports = CountryController