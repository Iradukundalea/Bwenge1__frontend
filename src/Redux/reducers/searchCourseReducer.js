export default (results = [], action) => {
    switch (action.type) {
        case 'SEARCHCOURSESRESULTS':
            return action.payload;
        default:
            return results
    }
}