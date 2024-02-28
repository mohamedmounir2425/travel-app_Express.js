const TripModel = require('../Models/trip.model');
const resData = require('../helperFunctions');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
            const user = req.user;
            if (!trip) {
                return resData(res, 404, false, {}, "Trip not found");
            }
            if (user.bookedTrips.some(trip => trip.tripId === tripId)) {
                return resData(res, 400, false, {}, "Trip already booked");
            }
            const charge = await stripe.charges.create({
                amount: trip.price * 100,
                currency: 'usd',
                source: req.body.token,
                description: `Charge for ${req.user.email}`,
              });
            user.bookedTrips = user.bookedTrips.concat({ tripId: req.params.id });
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