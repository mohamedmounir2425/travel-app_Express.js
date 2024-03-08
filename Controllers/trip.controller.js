const TripModel = require('../Models/trip.model');
const resData = require('../helperFunctions');

class TripController {
    static allTrips = async (req, res) => {
        try {
            const trips = await TripModel.find();
            resData(res, 200, true, trips, "success get data");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }

    static tripData = async (req, res) => {
        try {
            const trip = await TripModel.findById(req.params.id);
            await trip.populate("reviews");
            await trip.populate("hotelData");
            const data={
                trip,
                reviews:trip.reviews,
                hotelData:trip.hotelData
            }
            resData(res, 200, true, data, "success get data");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }
    static bookTrip = async (req, res) => {
        try {
            const trip = await TripModel.findById(req.params.id);
            trip.bookingUsers = trip.bookingUsers + 1;
            await trip.save();
            const user = req.user;
            user.bookedTrips = user.bookedTrips.concat({ tripId: +req.params.id });
            await user.save();
            resData(res, 200, true, user, "success booking");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }
}


module.exports = TripController;