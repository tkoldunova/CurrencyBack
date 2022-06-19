import StringHelper from "./strHelper.js"
import BlackMarketAPI from "./blackarcketAPI.js"
import mysql from 'mysql'

function BanksModel(name, buy, sell) {
    this.name = name;
    this.buy = buy;
    this.sell = sell;
}

class BanksParser {
     getParsedData(completion) {
        var connection = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user : 't_koldunova',
            password : 't@dDy_231',
            database : 'CURRENCY'
          });
          connection.connect(function(err){
             if (err) throw err
             console.log("connected")
             
          });

        BlackMarketAPI.getData('https://minfin.com.ua/ua/currency/banks/usd/', function(resp_data){
            if (resp_data == "error" || resp_data == "wrong") {
                return
               } else {
                  let r = StringHelper.getStrBtwTags(resp_data, '<td class="js-ex-rates mfcur-table-bankname"', '</td>')
                  let parsedUsdObj = []
                  for (let item of r) {
                      let kv = item.split('<a href=')
                      let buySell = kv[0].split('" data-card="')[0].split('data-title="')[1].split(" / ")
                      let name = kv[1].split("</span>")[1].split('\n')[0]
                      let objItem = {
                          "name": name, 
                          "buy": buySell[0],
                          "sell": buySell[1]
                      }
                      let sql = `update RATES set USD_BUY=${buySell[0]}, USD_SELL=${buySell[1]} where BANK_NAME="${name}"`;
                      
                      connection.query(sql);
                     // connection.end();
                      parsedUsdObj.push(objItem)
                  }
                  BlackMarketAPI.getData('https://minfin.com.ua/ua/currency/banks/eur/', function(resp_data){
                    let r = StringHelper.getStrBtwTags(resp_data, '<td class="js-ex-rates mfcur-table-bankname"', '</td>')
                    let parsedEurObj = []
                    for (let item of r) {
                        let kv = item.split('<a href=')
                        let buySell = kv[0].split('" data-card="')[0].split('data-title="')[1].split(" / ")
                        let name = kv[1].split("</span>")[1].split('\n')[0]
                        let objItem = {
                            "name": name, 
                            "buy": buySell[0],
                            "sell": buySell[1]
                        }
                        let sql = `UPDATE RATES
                        SET EUR_BUY = ${buySell[0]},
                        EUR_SELL = ${buySell[1]} 
                        WHERE BANK_NAME = "${name}"`;
                        console.log(sql);
                        connection.query(sql);
                        //connection.end();
                        parsedEurObj.push(objItem)
                  }
                  let date = new Date()
                  console.log(date.getTime())
                  const parsedObj = {
                      "usd": parsedUsdObj,
                      "eur": parsedEurObj,
                      "ts": date.getTime()
                  };
                  connection.end();
                  completion(JSON.stringify(parsedObj))
                }
                  )

                  
               }
    })
}
}
export default new BanksParser();