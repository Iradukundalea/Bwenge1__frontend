export default (selectCourse = {}, action) => {
    switch (action.type) {
        case 'SELECTED_COURSE':
            return action.payload;
        default:
            return selectCourse
    }
}