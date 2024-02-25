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
            const hotel = await HotelModel.findById(req.params.id);
            const reviews = await hotel.populate("reviews").execPopulate();
            const trips = await hotel.populate("trips").execPopulate();
            resData(res,200,true,{hotel,reviews,trips},'Hotel Data')
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
            const hotel = await HotelModel.findById(req.params.id)
            hotel.hotelName = req.body.hotelName
            hotel.hotelDescription = req.body.hotelDescription
            hotel.hotelImages = req.body.hotelImages
            hotel.hotelCountry = req.body.hotelCountry
            hotel.hotelRate = req.body.hotelRate
            const updatedHotel = await hotel.save()
            res.status(200).json(updatedHotel)
        } catch (error) {
            res.status(400).json({message:error})
        }
    }
    static async deleteHotel(req,res){
        try {
            const hotel = await HotelModel.findById(req.params.id)
            const deletedHotel = await hotel.remove()
            res.status(200).json(deletedHotel)
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
}
module.exports = HotelController