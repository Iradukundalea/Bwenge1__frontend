export default (courses = [], action) => {
    switch (action.type) {
        case 'GETIndivPartners':
            return action.payload;
        case 'IndivPartners_ERROR':
            return action.payload
        default:
            return courses
    }
}