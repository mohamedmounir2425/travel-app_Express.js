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
            resData(res, 200, true, trip, "success get data");
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
            user.bookedTrips = user.bookedTrips.push({ tripId: +req.params.id });
            await user.save();
            resData(res, 200, true, user, "success booking");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }

    // Admin Methods
    static addTrip = async (req, res) => {
        try {
            const trip = await new TripModel({ ...req.body });
            await trip.save();
            resData(res, 200, true, trip, "success adding");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }



    static updateTrip = async (req, res) => {
        try {
            const trip = await TripModel.findByIdAndUpdate(req.params.id, req.body);
            resData(res, 200, true, trip, "success update");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }

    static deleteTrip = async (req, res) => {
        try {
            const trip = await TripModel.findByIdAndDelete(req.params.id);
            resData(res, 200, true, trip, "success delete");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }
}


module.exports = TripController;