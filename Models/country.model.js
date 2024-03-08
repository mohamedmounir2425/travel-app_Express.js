const mongoose = require('mongoose');
const Trip = require('./trip.model');
const Hotel = require('./hotel.model');
const countrySchema = mongoose.Schema({
    _id: {
        type: Number
    },
    countryName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 20,
        lowercase: true,
    },
    countryDescription: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        lowercase: true,
    },
    countryImg: {
        type: String,
        trim: true,
    }
})
countrySchema.pre('remove', async function (next) {
    try {
        // Remove associated trips
        await Trip.deleteMany({ countryId: this._id });

        // Remove associated hotels
        await Hotel.deleteMany({ 'hotelCountry.countryId': this._id });

        next();
    } catch (error) {
        next(error);
    }
});
countrySchema.virtual("trips", {
    ref: "Trip",
    localField: "_id",
    foreignField: "countryId"
})
countrySchema.virtual("hotels", {
    ref: "Hotel",
    localField: "_id",
    foreignField: "hotelCountry.countryId"
})

const Country = mongoose.model('Country', countrySchema);
module.exports = Country;