import StringHelper from "./strHelper.js"
import BlackMarketAPI from "./blackarcketAPI.js"

class NationalBankParser {
    getParsedData(completion) {
        BlackMarketAPI.getData('https://minfin.com.ua/ua/currency/banks/', function(resp_data){
            if (resp_data == "error" || resp_data == "wrong") {
                return
              } else {
                let r = StringHelper.getStrBtwTags(resp_data, '<td class="mfcur-table-cur"', ' data-title="Валютний аукціон"')
                let parsedObj = []
                for (let item of r) {
                    let name = StringHelper.getSubstring(item, '/">', "</a>")
                    let nbu = StringHelper.getSubstring(item, '<span class="mfcur-nbu-full-wrap">', '<br>')
                    if (nbu.includes('\n')) {
                    nbu = nbu.replaceAll('\n', '')
                    }
                    let objItem = {
                        "currency": name, 
                        "value": nbu,
                    }
                    parsedObj.push(objItem)
                }
               
                completion(JSON.stringify(parsedObj));
            }
        })
    }
}

export default new NationalBankParser();