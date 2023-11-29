export default (UserQuizResult = {}, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'User_Quiz_Result':
            return action.payload;
        default:
            return UserQuizResult
    }
}