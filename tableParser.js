import StringHelper from "./strHelper.js"
import BlackMarketAPI from "./blackarcketAPI.js"

function BranchModel(name, city, adress, phone, workingMode, link, lat, lon) {
    this.name = name
    this.city = city 
    this.adress = adress
    this.phone = phone
    this.workingMode = workingMode
    this.link = link
    this.lat = lat
    this.lon = lon
}

class TableParser {
    getBranchesData(completion) {
        console.log("start")
        BlackMarketAPI.getData("https://www.prostobank.ua/spravochniki/otdeleniya", function(resp_data){
            const url = "https://www.prostobank.ua"
            let model = []
            if (resp_data == "error" || resp_data == "wrong") {
                console.log("error 1")
                return
              } else {
                  console.log("no error")
                let r = StringHelper.getStrBtwTags(resp_data, '<div class="quick-nav_item">', '</a></p>')
                for (let item of r) {
                    let link = StringHelper.getSubstring(item, '<p><a target="_blank" href="', '">')
                    let city = StringHelper.getSubstring(item, '">', "")
                    link = url + link
                    //console.log(city)
                   // console.log(link)

                    BlackMarketAPI.getData(link, function(city_data){
                        if (resp_data == "error" || resp_data == "wrong") {
                            return
                        } else {
                            //console.log(city_data)
                            let jsonData = StringHelper.getSubstring(city_data, "#map_branch_list'));", "window.AppModuleManager.load('rating_city_tabs');")
                            jsonData =  StringHelper.getSubstring(jsonData, "'map_branch_list', ", "]);")

                         //   if (link == 'https://www.prostobank.ua/spravochniki/otdeleniya/288') {
                            if (jsonData.includes("latitude") && jsonData.includes("longitude") && jsonData.includes("[{")) {
                                let j = JSON.parse(jsonData)
                              //  console.log(j)
                            
                               for (let item of j) {
                                   let lat = item.latitude
                                   let lon = item.longitude
                                   let branch_link = url + item.url 
                                   BlackMarketAPI.getData(branch_link, function(branch_data){
                                       if (branch_data == "error" || branch_data == "wrong") {
                                           console.log("error 3")
                                           return
                                        } else {
                                           // console.log('go here')
                                            let branch_res = StringHelper.getStrBtwTags(branch_data, '<div class="bank__info-item">', '</a></p>')
                                            //if (branch_link == 'https://www.prostobank.ua/spravochniki/otdeleniya/id/12187') {
                                                console.log("2 step___________________________________")
                                                console.log(branch_data)
                                                console.log(branch_data.includes('<div class="bank__info-item">'))
                                                console.log(branch_data.includes('</a></p>'))
                                                console.log(branch_res)
                                                let bankName = ""
                                                let adress = ""
                                                let phone = ""
                                                let workingMode = ""
                                                let link = ""
                                                for(let branch_item of branch_res){
                                                    let name = StringHelper.getSubstring(branch_res, '<h5>', '</h5>')
                                                    console.log(name)
                                                    if (name == "Банк:") {
                                                        bankName =  StringHelper.getSubstring(branch_res, '">', '</a></p>')
                                                        console.log(bankName)
                                                    } else if (name == "Адрес:") {
                                                         adress = StringHelper.getSubstring(branch_res, '<p>', '<span class=')
                                                         console.log(adress)
                                                    } else if (name == "Горячая линия:") {
                                                        phone = StringHelper.getSubstring(branch_res, '<p>', '</p>')
                                                        console.log(phone)
                                                    } else if (name == "Режим работы:") {
                                                        workingMode = StringHelper.getSubstring(branch_res, '<p>', '</p>')
                                                        console.log(workingMode)
                                                    } else if (name == "Официальный сайт:") {
                                                        link = StringHelper.getSubstring(branch_res, '<p>', '</p>')
                                                        console.log(link)
                                                    }
                                                }
                                                console.log(lat)
                                                console.log(lon)
                                                console.log(city)

                                                model.push(new BranchModel(bankName, city, adress, phone, workingMode, link, lat, lon))
                                                console.log(model)
                                        //    }
                                        }
                                   }) 
                              }
                            }
                        }
                            completion("res")
                    })
                }
                
              }
        })
    }
}

export default new TableParser();