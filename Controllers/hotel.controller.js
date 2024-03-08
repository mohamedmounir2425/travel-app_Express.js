const HotelModel = require('../Models/hotel.model')
const TripModel = require('../Models/trip.model')
const resData = require('../helperFunctions')
class HotelController {
    static async getHotels(req,res){
        try {
            const hotels = await HotelModel.find();
            resData(res,200,true,hotels,'All Hotels');
            // const hotels = await HotelModel.aggregate([
            //     {
            //         $lookup: {
            //             from: 'trips', // Name of the Trip collection
            //             localField: '_id',
            //             foreignField: 'hotel.id',
            //             as: 'trips'
            //         }
            //     },
            //     {
            //         $addFields: {
            //             tripsNumber: { $size: '$trips' }, // Count the number of trips
            //         }
            //     },
            //     {
            //         $project: {
            //             _id: 1,
            //             hotelName: 1,
            //             hotelDescription: 1,
            //             hotelImages: 1,
            //             hotelCountry: 1,
            //             hotelRate: 1,
            //             tripsNumber: 1
            //         }
            //     }
            // ]);
    
            // resData(res, 200, true, hotels, 'All hotels');
        } catch (error) {
            resData(res,500,false,[],error.message);
        }
    }
    static async getHotelById(req,res){
        try {
            const hotel = await HotelModel.findOne({_id:req.params.id});
            // const reviews = await hotel.populate("reviews").execPopulate();
            await hotel.populate("trips");
            const data = {
                hotel,
                trips:hotel.trips
            }
            resData(res,200,true,data,'Hotel Data')
        } catch (error) {
            resData(res,500,false,[],error.message)
        }
    }
}
module.exports = HotelController