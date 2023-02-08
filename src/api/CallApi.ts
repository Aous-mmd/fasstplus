import axios from "axios";
export const CallApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //   timeout: 1000,
  withCredentials: true,
});