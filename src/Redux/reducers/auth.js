export default (user = [], action) => {
    switch (action.type) {
        case 'REGISTER':
            return action.payload;
        case 'LOGIN':
            return action.payload
        case 'ERROR':
            return action.payload
        case 'FORGOTPASSWORD':
            return action.payload
        default:
            return user;
    }
}