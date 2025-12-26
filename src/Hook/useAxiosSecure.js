import { useMemo } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = useMemo(() => {
    return axios.create({
      baseURL: "http://localhost:5000",
    });
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
