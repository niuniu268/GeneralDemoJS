import axios from 'axios';
import {getToken, removeToken} from "./token";
import router from "../router";

const http = axios.create({
    baseURL: 'https://4d05995d-c8cf-4640-a38d-dd1828b3fbdb.mock.pstmn.io',
    timeout: 5000,
    }
)

http.interceptors.request.use((config)=> {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error)=> {
    return Promise.reject(error)
})

http.interceptors.response.use((response)=> {
    return response.data
}, (error)=> {

    console.dir(error)

    if (error.response.status === 401) {
        removeToken()
        router.navigate('/login')
        window.location.reload()
    }

    return Promise.reject(error)
})

export { http }
