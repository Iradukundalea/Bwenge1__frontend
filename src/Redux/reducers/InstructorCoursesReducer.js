export default (instructorcourses = [], action) => {
    switch (action.type) {
        case 'INSTRUCTOR_Courses':
            return action.payload;
        case 'INSTRUCTOR_Courses_Error':
            return action.payload
        default:
            return instructorcourses
    }
}