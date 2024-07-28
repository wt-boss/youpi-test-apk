import axios from 'axios';

// Récupérer le token CSRF depuis les meta tags
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// Configurer Axios
axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

export default axios;
