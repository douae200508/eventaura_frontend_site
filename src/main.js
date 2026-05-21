import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import './style.css'
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/api";

axios.interceptors.request.use(config => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')