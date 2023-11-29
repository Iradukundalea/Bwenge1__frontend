export default (courses = [], action) => {
    switch (action.type) {
        case 'GETLONGCOURSES':
            return action.payload;
        case 'GETLONGCOURSE':
            return action.payload
        case 'LONGCOURSE_ERROR':
            return action.payload
        default:
            return courses
    }
}