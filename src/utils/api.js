import axios from 'axios';
const api = axios.create({
    baseURL:`${import.meta.env.VITE_BACKEND_URL}/api/auth`,
});
export const googleAuth = (code) => api.post(`/googlelogin`,{"code":code});