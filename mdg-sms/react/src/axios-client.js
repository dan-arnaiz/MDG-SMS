import axios from "axios";

axios.defaults.withCredentials = true;

// Create Axios instance with base URL
const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

// Initialize CSRF token only once
let csrfInitialized = false;
const ensureCsrf = async () => {
    if (!csrfInitialized) {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/sanctum/csrf-cookie`, {
            withCredentials: true,
        });
        csrfInitialized = true;
    }
};

// Get a cookie value
const getCookie = (name) => {
    const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
    return match ? decodeURIComponent(match[3]) : null;
};

// Request Interceptor (Attach Tokens)
axiosClient.interceptors.request.use(async (config) => {
    await ensureCsrf();

    const token = localStorage.getItem('ACCESS_TOKEN');
    const csrfToken = getCookie('XSRF-TOKEN') ?? '';

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
}, (error) => Promise.reject(error));

// Response Interceptor (Handle Expired Tokens & Errors)
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401) {
            localStorage.removeItem('ACCESS_TOKEN');

            // Try refreshing the token
            try {
                const { data } = await axiosClient.post('/refresh-token');
                localStorage.setItem('ACCESS_TOKEN', data.access_token);

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                window.location.href = "/login"; // Force logout on failure
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
