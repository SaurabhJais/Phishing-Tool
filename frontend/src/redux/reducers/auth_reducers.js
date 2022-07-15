let insitialState = false;
let initialUserDetails = {};

export const isLoggedIn = (state = insitialState, action) => {
    if(action.type == "changeLoginStatus"){
        return action.payload;
    }
    return state;
}


export const userDetails = (state = initialUserDetails, action) => {
    if(action.type == "addUserDetails"){
        return action.payload;
    }
    return state;
}

