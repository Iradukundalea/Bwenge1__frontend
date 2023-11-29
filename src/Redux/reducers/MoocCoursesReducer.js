export default (Mooccourses = [], action) => {
    switch (action.type) {
        case 'GETMOOCCOURSES':
            return action.payload;
        case 'MOOC_COURSE_ERROR':
            return action.payload
        default:
            return Mooccourses
    }
}