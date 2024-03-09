const CountryModel = require('../Models/country.model')
const HotelModel = require('../Models/hotel.model')
const TripModel = require('../Models/trip.model');
const UserModel = require('../Models/user.model');

const {resData} = require('../helperFunctions');

class AdminController {

    // Number of Hotels, Countries, Trips, Users
    static getAdminData = async (req, res) => {
        try {
            const hotels = await HotelModel.find().countDocuments();
            const countries = await CountryModel.find().countDocuments();
            const trips = await TripModel.find().countDocuments();
            const users = await UserModel.find().countDocuments();
            const data = {
                hotels,
                countries,
                trips,
                users
            }
            resData(res, 200, true, data, "Admin Data");
        } catch (error) {
            resData(res, 500, false, {}, error.message);
        }
    }

    // COUNTRIES
    static createCountry = async (req, res) => {
        try {
            const country = new CountryModel({
                countryName: req.body.countryName,
                countryDescription: req.body.countryDescription,
                countryImg: req.body.countryImg
            })
            const newCountry = await country.save();
            resData(res, 200, true, newCountry, 'Country Data');
        } catch (error) {
            resData(res, 500, false, {}, error.message)
        }
    }
    static updateCountry = async (req, res) => {
        try {
            const country = await CountryModel.findByIdAndUpdate(req.params.id, req.body);
            resData(res, 200, true, country, 'success update');
        } catch (error) {
            resData(res, 500, false, {}, error.message)
        }
    }
    static deleteCountry = async (req, res) => {
        try {
            const country = await CountryModel.findByIdAndDelete(req.params.id)
            resData(res, 200, true, country, "success delete");
        } catch (error) {
            resData(res, 500, false, {}, error.message);
        }
    }

    // HOTELS
    static createHotel = async (req, res) => {
        try {
            const hotel = new HotelModel({
                hotelName: req.body.hotelName,
                hotelDescription: req.body.hotelDescription,
                hotelImages: req.body.hotelImages,
                hotelCountry: req.body.hotelCountry,
                hotelRate: req.body.hotelRate
            })
            const newHotel = await hotel.save();
            resData(res, 200, true, newHotel, 'Hotel Data');
        } catch (error) {
            resData(res, 500, false, {}, error.message)
        }
    }
    static updateHotel = async (req, res) => {
        try {
            const hotel = await HotelModel.findByIdAndUpdate(req.params.id, req.body);
            resData(res, 200, true, hotel, 'success update');
        } catch (error) {
            resData(res, 500, false, {}, error.message)
        }
    }
    static deleteHotel = async (req, res) => {
        try {
            const hotel = await HotelModel.findByIdAndDelete(req.params.id)
            resData(res, 200, true, hotel, "success delete");
        } catch (error) {
            resData(res, 500, false, {}, error.message);
        }
    }

    // TRIPS
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

    // USERS
    static getAllUsers = async (req, res) => {
        try {
            const users = await UserModel.find();
            resData(res, 200, true, users, 'All Users');
        } catch (error) {
            resData(res, 500, false, [], error.message);
        }
    }
    static delUser = async (req, res) => {
        try {
            const user = await UserModel.findByIdAndDelete(req.params.id);
            resData(res, 200, true, user, "success deleting");
        }
        catch (e) {
            resData(res, 500, false, e, "failed deleting");
        }
    }
    static setUserAdmin = async (req, res) => {
        try {
            const user = await UserModel.findById(req.params.id);
            user.isAdmin = !user.isAdmin;
            await user.save();
            resData(res, 200, true, user, "success update");
        }
        catch (e) {
            resData(res, 500, false, {}, e.message);
        }
    }
    static async getUserById(req, res) {
        try {
            const user = await UserModel.findById(req.params.id);
            resData(res, 200, true, user, 'User Data');
        } catch (error) {
            resData(res, 500, false, {}, error.message);
        }
    }
    static loginAdmin = async (req, res) => {
        try {
            const user = await UserModel.loginMe(req.body.email, req.body.password)
            if (!user.isAdmin) throw new Error("unauthorized")
            const token = await user.generateToken();
            resData(res, 200, true, { user, token }, "success login")
        }
        catch (e) {
            resData(res, 500, false, {}, e.message)
        }
    }

}

module.exports = AdminController;