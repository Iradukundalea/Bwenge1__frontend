export default (selectCourse = {}, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'SELECTED_MOOC_COURSE':
            return action.payload;
        default:
            return selectCourse
    }
}