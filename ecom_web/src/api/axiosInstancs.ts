import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7032/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("user");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;