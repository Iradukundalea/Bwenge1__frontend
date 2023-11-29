export default (papers = [], action) => {
    switch (action.type) {
        case 'GETPAPERS':
            return action.payload;
        case 'CREATEPAPER':
            return action.payload
        case 'GETPAPER':
            return action.payload
        case 'PAPER_ERROR':
            return action.payload
        default:
            return papers
    }
}