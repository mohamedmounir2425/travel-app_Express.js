const CountryModel = require('../Models/country.model')
const resData = require('../helperFunctions')

class CountryController{
    static async getCountries(req,res){
        try {
            const countries = await CountryModel.find()
            resData(res,200,true,countries,'All Countries')
        } catch (error) {
            resData(res,500,false,[],error.message)
        }
    }
    static async getCountryById(req,res){
        try {
            const country = await CountryModel.findOne({_id:req.params.id})
            await country.populate("hotels");
            await country.populate("trips");
            const data = {
                country,
                hotels:country.hotels,
                trips:country.trips
            }
            resData(res,200,true,data,'Country Data')
        } catch (error) {
            resData(res,500,false,{},error.message)
        }
    }
    // Admin Methods
    static async createCountry(req,res){
        try {
            const country = new CountryModel({
                countryName:req.body.countryName,
                countryDescription:req.body.countryDescription,
                countryImg:req.body.countryImg
            })
        
            const newCountry = await country.save();
            resData(res,200,true,newCountry,'Country Data');
        } catch (error) {
            resData(res,500,false,{},error.message)
        }
    }
    static async updateCountry(req,res){
        try {
            const country = await CountryModel.findById(req.params.id)
            country.countryName = req.body.countryName
            country.countryDescription = req.body.countryDescription
            country.countryImg = req.body.countryImg
            const updatedCountry = await country.save()
            res.status(200).json(updatedCountry)
        } catch (error) {
            res.status(400).json({message:error})
        }
    }
    static async deleteCountry(req,res){
        try {
            const country = await CountryModel.findById(req.params.id)
            const deletedCountry = await country.remove()
            res.status(200).json(deletedCountry)
        } catch (error) {
            res.status(500).json({message:error})
        }
    }
}

module.exports = CountryController