import axios from "axios";

const url = "http://localhost:5000/course";

export const getCourses = (coursereq) => axios.get(`${url}/courses`, coursereq);
export const getLongCourses = (coursereq) => axios.get(`${url}/longcourses`, coursereq);
export const createCourse = (paper) => axios.post(`${url}/createcourse`, paper);
export const searchCourses = (searchReq) => axios.post(`${url}/searchcourse`, searchReq)
export const deleteCourse = (id) => axios.delete(`${url}/deletecourse/${id}`, id)

//const getPaper = ()