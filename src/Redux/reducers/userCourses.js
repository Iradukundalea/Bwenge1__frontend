export default (usercourses = [], action) => {
    switch (action.type) {
        case 'User_Courses':
            return action.payload;
        case 'User_Courses_error':
            return action.payload
        default:
            return usercourses
    }
}