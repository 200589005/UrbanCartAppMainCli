import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import auth from '@react-native-firebase/auth';

const BASE_URL = 'https://urbancartnodejs.onrender.com/api';

class ApiService {
    private static instance: ApiService;
    private api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            baseURL: BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    private async setupInterceptors(): Promise<void> {
        this.api.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                try {
                    const currentUser = auth().currentUser;
                    if (currentUser) {
                        const token = await currentUser.getIdToken();
                        if (config.headers) {
                            config.headers.Authorization = `Bearer ${token}`;
                        }
                    }
                    return config;
                } catch (error) {
                    return Promise.reject(error);
                }
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.api.interceptors.response.use(
            (response) => response.data,
            (error) => {
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            // Handle unauthorized
                            break;
                        case 404:
                            // Handle not found
                            break;
                        default:
                        // Handle other errors
                    }
                    return Promise.reject(error.response.data);
                }
                return Promise.reject(error);
            }
        );
    }

    public getAxiosInstance(): AxiosInstance {
        return this.api;
    }
}

export const apiService = ApiService.getInstance();
export const api = apiService.getAxiosInstance();