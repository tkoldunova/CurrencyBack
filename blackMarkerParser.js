import axios from 'axios'
import StringHelper from "./strHelper.js"
import BlackMarketAPI from "./blackarcketAPI.js"

 class BlackMarketParser {
    parse_data(completion) {
     let response_data = ""
     BlackMarketAPI.getData("https://minfin.com.ua/currency/usd/", function(resp_data){
       if (resp_data == "error" || resp_data == "wrong") {
        completion("sorry something happens")
        return
       } else {
       response_data = resp_data
      // console.log(response_data)
       let r = StringHelper.getStrBtwTags(response_data, '<script>', '</script>' )
       r.forEach(element => {
          if (element.includes('var curWgtJSON = ')) {
           let j = element.split('= ')[1].split(';')[0]
           let data = JSON.parse(j)  
            const parsedObj = [
              {
                "currency": "usd",
                "auction": {
                  "buy:": data.USD.buy.auction,
                  "sell": data.USD.sell.auction,
                 },
                 "midCurrBank": {
                   "buy": data.USD.buy.midbank,
                   "sell": data.USD.sell.midbank
                 }
              },
              {
                "currency": "eur",
                "auction": {
                  "buy:": data.EUR.buy.auction,
                  "sell": data.EUR.sell.auction,
                 },
                 "midCurrBank": {
                   "buy": data.EUR.buy.midbank,
                   "sell": data.EUR.sell.midbank,
                 }
              },
              {
                "currency": "pln",
                "auction": {
                  "buy:": data.PLN.buy.auction,
                  "sell": data.PLN.sell.auction,
                },
                "midCurrBank": {
                  "buy": data.PLN.buy.midbank,
                  "sell": data.PLN.sell.midbank
                }
              },
              {
                "currency": "rub",
                "auction": {
                  "buy:": data.RUB.buy.auction,
                  "sell": data.RUB.sell.auction,
                 },
               "midCurrBank": {
                   "buy": data.RUB.buy.midbank,
                   "sell": data.RUB.sell.midbank
                 }
              }
            ]
             completion(JSON.stringify(parsedObj));
         }
        })
      }
     })
      
   }

}
export default new BlackMarketParser();
//module.exports = new BlackMarketParser();



