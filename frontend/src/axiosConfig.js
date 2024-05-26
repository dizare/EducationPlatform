import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
});

// Интерцептор запроса для установки заголовка авторизации перед каждым запросом
// axiosInstance.interceptors.request.use(config => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = token;
//     }
//     return config;
// });

// Интерцептор ответа для обработки ошибок аутентификации
axiosInstance.interceptors.response.use(response => response,
    function (error) {
        if (error.response.status === 401) {
            localStorage.removeItem("token")
            window.location.reload()
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
