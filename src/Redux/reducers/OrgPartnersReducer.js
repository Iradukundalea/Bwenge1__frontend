export default (courses = [], action) => {
    switch (action.type) {
        case 'GETOrgPartners':
            return action.payload;
        case 'OrgPartners_ERROR':
            return action.payload
        default:
            return courses
    }
}