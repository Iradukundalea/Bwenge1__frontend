export default (students = [], action) => {
    switch (action.type) {
        case 'Course_Students':
            return action.payload;
        case 'Course_Students_Error':
            return action.payload
        default:
            return students
    }
}