import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});