import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})



const admininstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

admininstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${window.localStorage.getItem('token')}`;

    return config;
})


export default admininstance;

