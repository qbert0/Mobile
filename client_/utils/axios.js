import axios from "axios";

const instance = axios.create({
  //  baseURL: 'http://10.30.15.136:3000'
  baseURL: "http://192.168.1.209:3000",

  //ktx
  // baseURL: 'http://192.168.1.80:3000'

  // quyen
  // baseURL: "http://192.168.1.80:3000"

  //ktx
  // baseURL: 'http://192.168.1.80:3000'

  // quyen
  // baseURL: "http://192.168.1.80:3000"
});

instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    return data; // Return the extracted data directly
  },
  (error) => Promise.reject(error)
);

export default instance;
