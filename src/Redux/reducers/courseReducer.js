export default (courses = [], action) => {
    switch (action.type) {
        case 'GETCOURSES':
            return action.payload;
        case 'CREATECOURSE':
            return action.payload
        case 'GETCOURSE':
            return action.payload
        case 'COURSE_ERROR':
            return action.payload
        default:
            return courses
    }
}