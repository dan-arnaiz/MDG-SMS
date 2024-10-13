import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api` // Use backticks for template literals
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN'); // Use getItem instead of get
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Use ${token} for string interpolation
    }
    return config;
});

axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { response } = error;
    if (response && response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
    }
    throw error;
});

export default axiosClient;