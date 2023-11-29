import axios from "axios";
import thekomp from "./../thekomp";

const url = `${thekomp}/service`;

export const getServices = (serviceReq) => axios.get(`${url}/getservices`, serviceReq);
export const setChecked = (id) => axios.patch(`${url}/setservicechecked/${id}`, id);
export const setDone = (id) => axios.patch(`${url}/setservicedone/${id}`, id);
