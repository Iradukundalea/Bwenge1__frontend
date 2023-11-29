import { combineReducers } from "redux";

import auth from './auth.js';
import paperReducers from "./paperReducers.js";
import selectedPaperReducer from "./selectedPaperReducer.js";
import searchPaperReducer from "./searchPaperReducer.js";
import courseReducer from "./courseReducer.js";
import selectedCourseReducer from "./selectedCourseReducer.js";
import searchCourseReducer from "./searchCourseReducer.js";
import longCoursesReducer from "./longCoursesReducer.js";
import servicesReducer from "./servicesReducer.js";
import IndivPartnersReducer from "./IndivPartnersReducer.js";
import OrgPartnersReducer from "./OrgPartnersReducer.js";
import MoocCoursesReducer from "./MoocCoursesReducer.js";
import SelectedMooc from "./SelectedMooc.js";
import SelectedQuizReducer from "./SelectedQuizReducer.js";
import userCourses from "./userCourses.js";
import SelectedMoocUserData from "./SelectedMoocUserData.js";
import UserQuizResults from "./UserQuizResults.js";
import InstructorCoursesReducer from "./InstructorCoursesReducer.js";
import CourseStudentsReducer from "./CourseStudentsReducer.js";

export default combineReducers({
    auth,
    papers: paperReducers,
    selectedPaper: selectedPaperReducer,
    searchPaperResults: searchPaperReducer,
    courses: courseReducer,
    selectedCourse: selectedCourseReducer,
    searchCourseResults: searchCourseReducer,
    longCourses: longCoursesReducer,
    services: servicesReducer,
    IndivPartners: IndivPartnersReducer,
    OrgPartners: OrgPartnersReducer,
    MoocCourses: MoocCoursesReducer,
    selectedMooc: SelectedMooc,
    selectedQuiz: SelectedQuizReducer,
    userCourses: userCourses,
    userCourseData: SelectedMoocUserData,
    userQuizResult: UserQuizResults,
    InstructorCourses: InstructorCoursesReducer,
    courseStudents: CourseStudentsReducer
})