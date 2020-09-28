import * as R from "ramda";
import {stringify} from 'qs';
import axios, {AxiosRequestConfig} from "axios";

const dev_backendLink = "http://localhost:3001";


export function getBackendAppLink(): string {
    switch (process.env.REACT_APP_ENV.trim()) {
        case "dev":
            return dev_backendLink;
        default:
            return dev_backendLink;
    }
}

const AxiosDefaultRequestConfig = (withToken: boolean) =>(
    {
        Pragma: 'no-cache',
        Authorization: withToken ? `Bearer ${localStorage.getItem('token')}` : null
    });

function onSuccess() {
    return (response: any) => {
        return response;
    }
}

function onRejected() {
    return (e: any) => {
        console.log(e);
        return Promise.reject(e)
    };
}

export class AxiosWrapper {
    static async get<T = any>(path: string, options: AxiosRequestConfig = {}, withToken = true): Promise<T> {
        const config = {
            ...options,
            paramsSerializer: params => stringify(params),
            headers: R.mergeDeepRight(options.headers, AxiosDefaultRequestConfig(withToken))
        };
        const url = getBackendAppLink() + path;
        return axios.get(url, config)
            .then(onSuccess())
            .catch(onRejected());
    }

    static async post<T, V = any>(path: string, body?: T, options: AxiosRequestConfig = {}, withToken = true): Promise<V> {
        const config = {
            ...options,
            headers: R.mergeDeepRight(options.headers, AxiosDefaultRequestConfig(withToken))
        };
        return axios.post(getBackendAppLink() + path, body, config)
            .then(onSuccess())
            .catch(onRejected());
    }

    static async put<T, V = any>(path: string, body?: T, options: AxiosRequestConfig = {}, withToken = true): Promise<V> {
        const config = {
            ...options,
            headers: R.mergeDeepRight(options.headers, AxiosDefaultRequestConfig(withToken))
        };
        return axios.put(getBackendAppLink() + path, body, config)
            .then(onSuccess())
            .catch(onRejected());
    }

    static async delete<T, V = any>(path: string, options: AxiosRequestConfig = {}, withToken = true): Promise<V> {
        const config = {
            ...options,
            headers: R.mergeDeepRight(options.headers, AxiosDefaultRequestConfig(withToken))
        };
        return axios.delete(getBackendAppLink() + path, config)
            .then(onSuccess())
            .catch(onRejected());
    }
}
