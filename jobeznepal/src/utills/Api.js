import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8001/api/",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export default Api;
