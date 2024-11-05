import axios from "axios";

axios.defaults.withCredentials = true;

// Create an Axios instance with the base URL
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

// Function to initialize CSRF token
const initCsrf = async () => {
    await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`, {
        withCredentials: true,
    });
};

// Function to get a cookie by name
const getCookie = (name) => {
    const match = document.cookie.match(
        new RegExp('(^|;\\s*)(' + name + ')=([^;]*)')
    );
    return match ? decodeURIComponent(match[3]) : null;
};

// Add a request interceptor to include the CSRF token and Authorization header
axiosClient.interceptors.request.use(async (config) => {
    // Initialize CSRF token
    await initCsrf();

    // Retrieve the token from localStorage
    const token = localStorage.getItem('ACCESS_TOKEN');
    // Retrieve the CSRF token from cookies
    const csrfToken = getCookie('XSRF-TOKEN') ?? '';

    // Include the Authorization header if the token is present
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // Include the CSRF token in the headers
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
}, (error) => {
    // Handle request error
    return Promise.reject(error);
});

// Add a response interceptor to handle responses and errors
axiosClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    const { response } = error;
    if (response && response.status === 401) {
        // Handle unauthorized error
        localStorage.removeItem('ACCESS_TOKEN');
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default axiosClient;