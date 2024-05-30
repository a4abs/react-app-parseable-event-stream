/**
 * Name:parseableAxiosInstance
 * description: Customize axios instance to send logs to parseable
 */
import axios from "axios";
const parseableURL = "https://demo.parseable.com";

export const parseableAxiosInstance = axios.create({
  baseURL: parseableURL,
});

parseableAxiosInstance.interceptors.request.use(
  (config) => {
    // Alternatively, add to request body
    if (config.method === "post" || config.method === "put") {
      let user: any = localStorage.getItem("profile");
      if (user) {
        user = JSON.parse(user);
        config.data = {
          ...config.data,
          user: user.id,
          //@ts-ignore
          host: parseableAxiosInstance.defaults.ipAddress || null,
        };
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
