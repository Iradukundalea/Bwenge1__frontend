import * as auth from "../../api/auth.js";
import * as paperAPI from "../../api/paper.js";
import * as courseAPI from "../../api/course.js";
import * as serviceAPI from "../../api/service.js";
import * as partnerAPI from "../../api/partnership.js";
import * as moocAPI from "../../api/mooccourses.js";
import * as enrollAPI from "../../api/enrollment.js";
import history from "./history";

export const register = (newUser) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    console.log(newUser.username);
    delete newUser.confirmPassword;
    const { data } = await auth.register(newUser, config);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userName", data.username);
    localStorage.setItem("email", data.email);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("role", data.role);
    dispatch({ type: "REGISTER", payload: data });
    dispatch({ type: "ERROR", payload: "" });
    history.push("/");
  } catch (error) {
    console.log(error.response.data.error);
    dispatch({ type: "ERROR", payload: error.response.data.error });
  }
};
export const login = (user) => async (dispatch) => {
  try {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await auth.login(user, config);
    console.log(data);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("userName", data.username);
    localStorage.setItem("email", data.email);
    localStorage.setItem("userId", data.id);
    localStorage.setItem("role", data.role);
    dispatch({ type: "ERROR", payload: "" });
    dispatch({ type: "LOGIN", payload: data });

    history.push("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: "ERROR", payload: error.response.data.error });
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await auth.forgotPassword(email, config);
    dispatch({ type: "FORGOTPASSWORD", payload: data });
    dispatch({ type: "ERROR", payload: "" });
  } catch (error) {
    console.log(error.message);
    dispatch({ type: "ERROR", payload: error.response.data.error });
  }
};

export const getAllPapers = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await paperAPI.getAllPapers(config);
    console.log(data);
    dispatch({ type: "GETPAPERS", payload: data });
  } catch (error) {
    dispatch({ type: "PAPER_ERROR", payload: error.response.data.error });
  }
};
export const getPapers = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await paperAPI.getPapers(config);
    console.log(data);
    dispatch({ type: "GETPAPERS", payload: data });
  } catch (error) {
    dispatch({ type: "PAPER_ERROR", payload: error.response.data.error });
  }
};

export const createPaper = (paperInfo) => async (dispatch) => {
  console.log(paperInfo);
  var formData = new FormData();

  for (let key in paperInfo) {
    formData.append(key, paperInfo[key]);
  }
  console.log(formData);
  try {
    const config = {
      headers: {
        headers: {
          "Content-type": "multipart/form-data",
        },
      },
    };

    const { data } = await paperAPI.createPaper(formData, config);
    dispatch({ type: "PAPER_ERROR", payload: "" });
    dispatch({ type: "CREATEPAPER", payload: data });

    history.push("/papers");
  } catch (error) {
    console.log(error);
    dispatch({ type: "PAPER_ERROR", payload: error.response.data.error });
  }
};

export const selectPaper = (paper) => (dispatch) => {
  console.log(paper);
  dispatch({ type: "SELECTED_PAPER", payload: paper });
  history.push("/paper");
};

export const searchPaper = (searchReq) => async (dispatch) => {
  //console.log(searchReq);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await paperAPI.searchPapers(searchReq, config);
    console.log(data);
    history.push("searchresult");
    dispatch({ type: "SEARCHPAPERSRESULTS", payload: data });
  } catch (error) {
    dispatch({ type: "PAPER_ERROR", payload: error.response.data.error });
  }
};

export const deletePaper = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await paperAPI.deletePaper(id, config);
    console.log(data);
    history.push("/papers");
  } catch (error) {}
};

export const getCourses = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await courseAPI.getCourses(config);
    console.log(data);
    dispatch({ type: "GETCOURSES", payload: data });
  } catch (error) {
    dispatch({ type: "COURSE_ERROR", payload: error.response.data.error });
  }
};
export const getLongCourses = () => async (dispatch) => {
  console.log("here");
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await courseAPI.getLongCourses(config);
    console.log(data);
    dispatch({ type: "GETLONGCOURSES", payload: data });
  } catch (error) {
    dispatch({ type: "LONGCOURSE_ERROR", payload: error.response.data.error });
  }
};

export const selectCourse = (course) => (dispatch) => {
  console.log(course);
  dispatch({ type: "SELECTED_COURSE", payload: course });
};
export const deleteCourse = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await courseAPI.deleteCourse(id, config);
    console.log(data);
    history.push("/courses");
  } catch (error) {}
};

export const searchCourse = (searchReq) => async (dispatch) => {
  //console.log(searchReq);
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await courseAPI.searchCourses(searchReq, config);
    console.log(data);
    history.push("searchresult");
    dispatch({ type: "SEARCHCOURSESRESULTS", payload: data });
  } catch (error) {
    dispatch({ type: "COURSE_ERROR", payload: error.response.data.error });
  }
};

export const getServices = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await serviceAPI.getServices(config);
    console.log(data);
    dispatch({ type: "GETSERVICES", payload: data });
  } catch (error) {
    dispatch({ type: "SERVICE_ERROR", payload: error.response.data.error });
  }
};
export const getIndivPartns = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await partnerAPI.getIndivPartners(config);
    console.log(data);
    dispatch({ type: "GETIndivPartners", payload: data });
  } catch (error) {
    dispatch({
      type: "IndivPartners_ERROR",
      payload: error.response.data.error,
    });
  }
};
export const getOrgPartns = () => async (dispatch) => {
  console.log("here");
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await partnerAPI.getOrgPartners(config);
    console.log(data);
    dispatch({ type: "GETOrgPartners", payload: data });
  } catch (error) {
    dispatch({ type: "OrgPartners_ERROR", payload: error.response.data.error });
  }
};

export const setServiceChecked = (id) => async (dispatch) => {
  console.log(id);
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await serviceAPI.setChecked(id, config);
    dispatch({ type: "GETSERVICES", payload: data });
  } catch (error) {
    dispatch({ type: "SERVICE_ERROR", payload: error.response.data.error });
  }
};
export const setServiceDone = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await serviceAPI.setDone(id, config);
    dispatch({ type: "GETSERVICES", payload: data });
  } catch (error) {
    dispatch({ type: "SERVICE_ERROR", payload: error.response.data.error });
  }
};

export const setIndivPartChecked = (id) => async (dispatch) => {
  console.log(id);
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await partnerAPI.setIndivPartnerChecked(id, config);
    dispatch({ type: "GETIndivPartners", payload: data });
  } catch (error) {
    dispatch({
      type: "IndivPartners_ERROR",
      payload: error.response.data.error,
    });
  }
};
export const setIndivPartApproved = (id) => async (dispatch) => {
  console.log(id);
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await partnerAPI.setIndivPartnerApproved(id, config);
    dispatch({ type: "GETIndivPartners", payload: data });
  } catch (error) {
    dispatch({
      type: "IndivPartners_ERROR",
      payload: error.response.data.error,
    });
  }
};
export const setOrgPartChecked = (id) => async (dispatch) => {
  console.log(id);
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await partnerAPI.setOrgPartnerChecked(id, config);
    dispatch({ type: "GETOrgPartners", payload: data });
  } catch (error) {
    dispatch({ type: "OrgPartners_ERROR", payload: error.response.data.error });
  }
};
export const setOrgPartApproved = (id) => async (dispatch) => {
  console.log(id);
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await partnerAPI.setOrgPartnerApproved(id, config);
    dispatch({ type: "GETOrgPartners", payload: data });
  } catch (error) {
    dispatch({ type: "OrgPartners_ERROR", payload: error.response.data.error });
  }
};

export const getAllMoocCourses = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await moocAPI.getAllMoocCourses(config);
    dispatch({ type: "GETMOOCCOURSES", payload: data });
  } catch (error) {
    dispatch({ type: "MOOC_COURSE_ERROR", payload: error.response.data.error });
  }
};

export const selectMoocCourse = (course) => (dispatch) => {
  //console.log(course);
  dispatch({ type: "SELECTED_MOOC_COURSE", payload: course });
};

export const selectQuiz = (quiz) => (dispatch) => {
  dispatch({ type: "SELECTED_QUIZ", payload: quiz });
};

export const getUserCourses = (userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await enrollAPI.getUserCourses(userId, config);
    console.log(data);
    dispatch({ type: "User_Courses", payload: data });
  } catch (error) {
    dispatch({
      type: "User_Courses_error",
      payload: error.response.data.error,
    });
  }
};

export const getCourseUserData = (userCourse) => (dispatch) => {
  console.log(userCourse);
  dispatch({ type: "selectedMooc_UserData", payload: userCourse });
};

export const selectQuizResults = (quizResults) => (dispatch) => {
  dispatch({ type: "User_Quiz_Result", payload: quizResults });
};

export const getInstructorCourses = (email) => async (dispatch) => {
  try {
    const { data } = await moocAPI.getInstructorCourses(email);
    dispatch({ type: "INSTRUCTOR_Courses", payload: data });
  } catch (error) {
    dispatch({
      type: "INSTRUCTOR_Courses_Error",
      payload: error.response.data.error,
    });
  }
};

export const getCourseStudents = (courseId) => async (dispatch) => {
  try {
    const { data } = await enrollAPI.getCourseStudents(courseId);
    dispatch({ type: "Course_Students", payload: data });
  } catch (error) {
    dispatch({
      type: "Course_Students_Error",
      payload: error.response.data.error,
    });
  }
};
