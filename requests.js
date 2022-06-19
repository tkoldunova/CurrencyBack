import BlackMarketParser from './blackMarkerParser.js'
import BanksParser from "./banksParser.js"
import NationalBankParser from "./nationalBankParser.js"
import PositionParser from "./positionParser.js"
class Requests{
    async getBlackMarketRequest(req, res) {
        try {
            BlackMarketParser.parse_data(function(parsed_data){
               // console.log("this mess is" + parsed_data)
                res.send(parsed_data)
            })
        } catch (e) {
            console.log("go here")
            res.status(500).json(e)
            console.log(e)
        }

    }

    async getPossitionRequest(req, res) {
        try {
            PositionParser.getData(req.query.lat, req.query.lon, function(parsed_data){
               console.log("this mess is" + parsed_data)
                res.send(parsed_data)
            })
        } catch (e) {
            console.log("go here")
            res.status(500).json(e)
            console.log(e)
        }
    }

    async getBanksRequest(req, res) {
        try {
            BanksParser.getParsedData(function(parsed_data){
                res.send(parsed_data)
              })
        } catch (e) {
            console.log("go here")
            res.status(500).json(e)
            console.log(e)
        }

    }

    async getNationalBanksRequest(req, res) {
        try {
            NationalBankParser.getParsedData(function(parsed_data){
                res.send(parsed_data)
              })
        } catch (e) {
            console.log("go here")
            res.status(500).json(e)
            console.log(e)
        }
    }

    async getBankPositions(req, res) {
        try {
            PositionParser.getBankPosition(req.query.bankName, req.query.lat, req.query.lon, function(parsed_data){
                res.send(parsed_data)
              })
        } catch (e) {
            console.log("go here")
            res.status(500).json(e)
            console.log(e)
        }
    }
}
export default new Requests();
