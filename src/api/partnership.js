import axios from "axios";
import thekomp from "./../thekomp";

const url = `${thekomp}/partnership`;

export const getIndivPartners = (partnerReq) => axios.get(`${url}/getindivpartners`, partnerReq);
export const getOrgPartners = (partnerReq) => axios.get(`${url}/getorgpartners`, partnerReq);
export const setIndivPartnerChecked = (id) => axios.patch(`${url}/setindivpartchecked/${id}`, id);
export const setIndivPartnerApproved = (id) => axios.patch(`${url}/setindivpartapproved/${id}`, id);
export const setOrgPartnerChecked = (id) => axios.patch(`${url}/setorgpartchecked/${id}`, id);
export const setOrgPartnerApproved = (id) => axios.patch(`${url}/setorgpartapproved/${id}`, id);
