/**
 * 通用类库，业务无关，UI无关
 */

 export default {
     object:{
        copyDeep(obj){
            return JSON.parse(JSON.stringify(obj))
        },
     },
     local:{
        setItem(key, value){
            localStorage.setItem(key, value)
        },
        getItem(key, defaultValue){
            
            let val = localStorage.getItem(key)
            if(!val) {
                if(typeof(defaultValue) == "undefined"){
                    // typeof 返回的是字符串，有六种可能：“number”、“string”、“boolean”、“object”、“function”、“undefined”
                    defaultValue = ''
                }
                return defaultValue
            } 
            return val
        },
        setJson(key, obj){
            localStorage.setItem(key, JSON.stringify(obj))
        },
        getJson(key){
            let json = localStorage.getItem(key);
            if(json && (json.startsWith('{') || json.startsWith('['))){
                return JSON.parse(json)
            }
            return null;
        }
     },
     json:{
        toJson(obj){
            return JSON.stringify(obj)
        },
        toJsonPretty(obj){
            return  JSON.stringify(obj, '', 4)
        },
        toObj(json){
            if(json && (json.startsWith('{') || json.startsWith('['))){
                return JSON.parse(json)
            }
            return null
        }
     },
     str:{
        isInt(){

        },
        isDouble(){

        },
        isEmail(){

        },
        isMobile(){

        },
        join(iterable, joiner, ingoreNull){

        }
     },
     list:{
        isEmpty(list){
            return !list
        },
        removeByIndex(list, index){
            if(!list) return
            list.splice(index, 1)
        }
     },
     map:{

     },
     set:{

     },
     date:{
         
     }
 }