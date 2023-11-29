export default (selectPaper = {}, action) => {
    switch (action.type) {
        case 'SELECTED_PAPER':
            return action.payload;
        default:
            return selectPaper
    }
}