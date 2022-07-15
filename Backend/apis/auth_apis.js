let db = require("../db")




let check_if_mail_exist = async (mail) => {
    let result = await db.getDb().collection("users").findOne({mail});
    if(result){
        return true 
    }else{ 
        return false
    }
}

let check_if_phone_exist = async (phone) => {
    let result = await db.getDb().collection("users").findOne({phone});
    if(result){
        return true
    }else{
        return false
    }
}

let create_userName = (email) => {
    if(email.indexOf("@") != -1)
    return email.split("@")[0];
    return email;
}


let get_user_data = async (mail) => {
    let result = await db.getDb().collection("users").findOne({mail});
    return result;
}

module.exports = {
    check_if_mail_exist,
    check_if_phone_exist,
    create_userName,
    get_user_data
}