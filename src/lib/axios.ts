import { API_URL } from '@/constants/environments/apiUrl';
import axios from 'axios'

const baseURL = API_URL

export const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            window.location.href = '/auth/sign-in';
        }
        return Promise.reject(error);
    }
);