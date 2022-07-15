export const changeLoginState = (payload) => {
    return {
        type: "changeLoginStatus",
        payload: payload
    }
} 


export const addUserDetails = (payload) => {
    return {
        type: "addUserDetails",
        payload: payload,
    }
}


