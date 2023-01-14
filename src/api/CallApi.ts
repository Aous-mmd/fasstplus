import axios from "axios";
import { toast } from 'react-toastify';
export const CallApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //   timeout: 1000,
  withCredentials: true,
});


const errorHandler = (error: any) => {
  error.response.data.errors.forEach((errs: string) => toast.error(errs));
  return Promise.reject({ ...error })
}
const successHandler = (response: any) => {
  toast.success(`${response.data.msg}`);

  return Promise.resolve({ ...response })
}

CallApi.interceptors.response.use(
  (response) => { successHandler(response); return response },
  (error) => errorHandler(error)
);