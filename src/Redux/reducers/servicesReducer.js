export default (courses = [], action) => {
    switch (action.type) {
        case 'GETSERVICES':
            return action.payload;
        case 'SERVICE_ERROR':
            return action.payload
        default:
            return courses
    }
}