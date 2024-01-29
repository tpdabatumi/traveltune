import axios from "axios";
import { BASE_URL } from "../config/settings";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const welcomeData = () => instance.get("/welcome");
export const questionsData = () => instance.get("/questions");
export const personalitiesData = () => instance.get("/personalities");
