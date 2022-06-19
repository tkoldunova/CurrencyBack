class StringHelper {
     getStrBtwTags(str, tg1, tg2) {
       let mainStr = str.substring(str.indexOf(tg1), str.lastIndexOf(tg2)+tg2.length)
        let res = mainStr.split(tg1)
         let r = res.filter(function(value){
            return value.includes(tg2)
        })
        for (let i in r) {
          if (r[i].includes(tg2)) {
            let v = r[i].split(tg2)
            r[i] = v[0]
          }
        }
        return r
    };

    getSubstring(str, tg1, tg2) {
      let mainStr = str.substring(str.indexOf(tg1)+tg1.length, str.lastIndexOf(tg2))
      return mainStr
    }
};
export default new StringHelper();
//module.exports = StringHelper


