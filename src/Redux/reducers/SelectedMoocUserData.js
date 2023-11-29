export default (courseUserData = {}, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'selectedMooc_UserData':
            return action.payload;
        default:
            return courseUserData
    }
}