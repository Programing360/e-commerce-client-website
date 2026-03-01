import { useMemo } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    const instance = axios.create({
      baseURL: "https://e-commerce-server-website.vercel.app",
      withCredentials: true,
    });

    // 🔐 handle unauthorized globally
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          alert("Unauthorized - redirect to login");
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
