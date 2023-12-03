import axios from "axios";

const url = "http://13.59.38.98:5000/auth";

export const login = (user) => {
  return axios.post(`${url}/login`, user);
};
export const register = (newUser) => axios.post(`${url}/register`, newUser);
export const forgotPassword = (email) =>
  axios.post(`${url}/forgotpassword`, email);
export const resetPassword = (newPassword) =>
  axios.put(`${url}/forgotpassword`, newPassword);
