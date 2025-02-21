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
                const { data } = await axiosClient.post('/auth/refresh-token');
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

// API Endpoints
export const authApi = {
    login: (credentials) => axiosClient.post('/auth/login', credentials),
    register: (userData) => axiosClient.post('/auth/register', userData),
    logout: () => axiosClient.post('/auth/logout'),
    getUser: () => axiosClient.get('/auth/user'),
};

export const userApi = {
    getAll: () => axiosClient.get('/users'),
    get: (id) => axiosClient.get(`/users/${id}`),
    create: (data) => axiosClient.post('/users', data),
    update: (id, data) => axiosClient.put(`/users/${id}`, data),
    delete: (id) => axiosClient.delete(`/users/${id}`),
};

export const studentApi = {
    getAll: () => axiosClient.get('/students'),
    get: (id) => axiosClient.get(`/students/${id}`),
    create: (data) => axiosClient.post('/students', data),
    update: (id, data) => axiosClient.put(`/students/${id}`, data),
    delete: (id) => axiosClient.delete(`/students/${id}`),
};

export const relativeApi = {
    getAll: () => axiosClient.get('/relatives'),
    get: (id) => axiosClient.get(`/relatives/${id}`),
    create: (data) => axiosClient.post('/relatives', data),
    update: (id, data) => axiosClient.put(`/relatives/${id}`, data),
    delete: (id) => axiosClient.delete(`/relatives/${id}`),
};

export const scholarshipApi = {
    getAll: () => axiosClient.get('/scholarships'),
    get: (id) => axiosClient.get(`/scholarships/${id}`),
    create: (data) => axiosClient.post('/scholarships', data),
    update: (id, data) => axiosClient.put(`/scholarships/${id}`, data),
    delete: (id) => axiosClient.delete(`/scholarships/${id}`),
};

export default axiosClient;