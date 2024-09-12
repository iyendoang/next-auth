import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BACKEND, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosPublic;
