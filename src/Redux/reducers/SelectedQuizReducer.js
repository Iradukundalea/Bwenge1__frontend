export default (selectQuiz = {}, action) => {
    switch (action.type) {
        case 'SELECTED_QUIZ':
            return action.payload;
        default:
            return selectQuiz
    }
}