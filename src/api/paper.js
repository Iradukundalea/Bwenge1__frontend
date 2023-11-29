import axios from "axios";
import thekomp from "./../thekomp";
const url = `${thekomp}/paper`;

export const getPapers = (paperreq) => axios.get(`${url}/papers`, paperreq);
export const getAllPapers = (paperreq) => axios.get(`${url}/allpapers`, paperreq);
export const createPaper = (paper) => axios.post(`${url}/createpaper`, paper);
export const searchPapers = (searchReq) => axios.post(`${url}/searchpaper`, searchReq);
export const deletePaper = (id) => axios.delete(`${url}/deletepaper/${id}`, id);

//const getPaper = ()
