export default (results = [], action) => {
    switch (action.type) {
        case 'SEARCHPAPERSRESULTS':
            return action.payload;
        default:
            return results
    }
}