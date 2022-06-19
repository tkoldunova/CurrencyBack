import axios from 'axios'
import StringHelper from "./strHelper.js"

class BlackMarketAPI {
 
 getData(link, completion) {
    axios.get(link, {
        headers: {'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36' }
    })
    .then(function (response) {
        completion(response.data)
   })
   .catch(function (error) {
       console.log(error.message)
       completion("error") 
   })
 }
    
//  getBlackMarket(completion) {
//      axios.get('https://minfin.com.ua/currency/usd/')
//      .then(function (response) {
//          completion(response.data)
//     })
//     .catch(function (error) {
//         completion("error") 
//     })
//     }
}

export default new BlackMarketAPI();