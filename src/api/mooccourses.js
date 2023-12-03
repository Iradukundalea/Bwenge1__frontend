import axios from "axios";
const url = "http://13.59.38.98:5000/mooc";

export const getAllMoocCourses = (courseReq) =>
  axios.get(`${url}/mooccourses`, courseReq);
export const getInstructorCourses = (email) =>
  axios.get(`${url}/getinstructorcourse/${email}`, email);
