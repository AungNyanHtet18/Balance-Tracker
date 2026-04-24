import axios from "axios";
import { authStore } from "../store/auth-result.store";
import { refreshToken } from "./anonymous/client";

export function anonymousClient() {
    return axios.create({
        baseURL: 'http://localhost:8080/anonymous',
        timeout: 3000
    })
}

export function securedClient() {

    const instance = axios.create({
        baseURL: 'http://localhost:8080',
        timeout: 3000
    })

    instance.interceptors.request.use(config => {
        const {auth} = authStore.getState()
    
        if(auth) {
            config?.headers.set('Authorization', `Bearer ${auth.accessToken}`)
        }
        return config
    })

    instance.interceptors.response.use(response => {
        return response
    }, async (error) => {

        const originalRequest = error.config as typeof error.config & {_retry?: boolean}
        const {auth, setAuth} = authStore.getState()
        const status = error?.response?.status ?? error?.status

        if((status == 408 || status == 401) && originalRequest && !originalRequest._retry) {
            originalRequest._retry = true
            
            // Refresh token
            const refreshResult = await refreshToken(auth?.refreshToken || '')
            setAuth(refreshResult)

            // Retry last request and return its response to the caller.
            return instance(originalRequest)
        }

        return Promise.reject(error)
    })

    return instance
}
