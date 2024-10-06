import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Определяем базовый URL для API
const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';

// Создаем экземпляр Axios с базовыми настройками
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

// Определяем типы для наших методов API
type GetMethod = <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
type DeleteMethod = <T>(url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
type PutMethod = <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
type PostMethod = <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;

// Реализуем методы API с типами
const _get: GetMethod = (url, config = {}) => {
  return apiClient.get(url, config);
};

const _delete: DeleteMethod = (url, config = {}) => {
  return apiClient.delete(url, config);
};

const _put: PutMethod = (url, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

const _post: PostMethod = (url, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

// Экспортируем методы API
export { _get, _delete, _put, _post };
