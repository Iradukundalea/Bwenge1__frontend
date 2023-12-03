import axios from "axios";

const url = "http://13.59.38.98:5000/enroll";

export const getUserCourses = (userId) =>
  axios.get(`${url}/getmycourses/${userId}`, userId);
export const getCourseStudents = (courseId) =>
  axios.get(`${url}/getcoursestudents/${courseId}`, courseId);
