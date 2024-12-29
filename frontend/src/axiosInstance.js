import axios from 'axios';


const development = 'http://localhost:5000';
const production = 'http://courier-production-9452.up.railway.app';

const apiClient = axios.create({
    baseURL: development, // Dynamically uses the base URL from .env
    timeout: 30000, // Optional: Set a timeout for API requests
});

// You can also set default headers here if needed
apiClient.defaults.headers.common['Content-Type'] = 'application/json';

export default apiClient;
