import express from 'express';
import router from "./router.js";
import BlackMarketParser from './blackMarkerParser.js'
import BanksParser from "./banksParser.js"
import NationalBankParser from "./nationalBankParser.js"
import PositionParser from "./positionParser.js"
import BlackMarketAPI from "./blackarcketAPI.js"
import StringHelper from "./strHelper.js"


const PORT = 3000;
const app = express();


// PositionParser.getData(function(res){
//     console.log(res)
//   })

app.use('/api', router)
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

//module.exports = app
