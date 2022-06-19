import mysql from 'mysql'

class PositionParser {
    getData(lat, lon, completion) {
        console.log(lat)
        console.log(lon)
        var connection = mysql.createConnection({
            //host : '127.0.0.1:3306',
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
          connection.query(`SELECT BRANCHES.BANK_NAME , CITY, ADDRESS, PHONE, LAT, LON, USD_BUY, USD_SELL, EUR_BUY, EUR_SELL from BRANCHES left join RATES on RATES.BANK_NAME = BRANCHES.BANK_NAME where  abs(LAT - ${lat}) < 0.5 and abs(LON - ${lon}) < 0.5`, function (error, results, fields) {
            if (error) throw error;
           // console.log('The solution is: ', results);
            completion(results)
          });
    }

    getBankPosition(bank_name, lat, lon, completion) {
        var connection = mysql.createConnection({
            //host : '127.0.0.1:3306',
            host: 'localhost',
            port: 3306,
            user: 't_koldunova',
            password : 't@dDy_231',
            database : 'CURRENCY'
          });
          connection.connect(function(err){
             if (err) throw err
             console.log("connected")
             
          });
          connection.query(`SELECT BRANCHES.BANK_NAME , CITY, ADDRESS, PHONE, LAT, LON, USD_BUY, USD_SELL, EUR_BUY, EUR_SELL from BRANCHES left join RATES on RATES.BANK_NAME = BRANCHES.BANK_NAME where  abs(LAT - ${lat}) < 0.5 and abs(LON - ${lon}) < 0.5 and BRANCHES.BANK_NAME = '${bank_name}'`, function (error, results, fields) {
            if (error) throw error;
           // console.log('The solution is: ', results);
            completion(results)
          });
    }
}

export default new PositionParser();
