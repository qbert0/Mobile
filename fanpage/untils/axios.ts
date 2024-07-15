import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const instance: AxiosInstance = axios.create({
//   baseURL: "http://192.168.111.149:3000" 
    // baseURL: "http://192.168.1.220:3000"

    // quyen
    baseURL: "http://192.168.1.80:3000"
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data;
    return data;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default instance;
