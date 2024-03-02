const HotelModel = require('../Models/hotel.model')
const resData = require('../helperFunctions')
class HotelController {
    static async getHotels(req,res){
        try {
            const hotels = await HotelModel.find();
            resData(res,200,true,hotels,'All Hotels');
        } catch (error) {
            resData(res,500,false,[],error.message);
        }
    }
    static async getHotelById(req,res){
        try {
            console.log(req.params.id)
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
    // Admin Methods
    static async createHotel(req,res){
        try {
            const hotel = new HotelModel({
                hotelName:req.body.hotelName,
                hotelDescription:req.body.hotelDescription,
                hotelImages:req.body.hotelImages,
                hotelCountry:req.body.hotelCountry,
                hotelRate:req.body.hotelRate
            })
            const newHotel = await hotel.save();
            resData(res,200,true,newHotel,'Hotel Data');
        } catch (error) {
            resData(res,500,false,{},error.message)
        }
    }
    static async updateHotel(req,res){
        try {
            const hotel = await HotelModel.findByIdAndUpdate(req.params.id,req.body);
            resData(res,200,true,hotel,'success update');
        } catch (error) {
            resData(res,500,false,{},error.message)
        }
    }
    static async deleteHotel(req,res){
        try {
            const hotel = await HotelModel.findByIdAndDelete(req.params.id)
            resData(res, 200, true, hotel, "success delete");
        } catch (error) {
            resData(res, 500, false, {}, error.message);
        }
    }
}
module.exports = HotelController