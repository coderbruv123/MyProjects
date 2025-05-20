import axios  from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7032/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
});
export default axiosInstance;