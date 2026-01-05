import { useMemo } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
    });

    // 🔐 handle unauthorized globally
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.log("Unauthorized - redirect to login");
          // optional: window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
