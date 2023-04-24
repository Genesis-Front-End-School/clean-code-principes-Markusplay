import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `https://api.wisey.app/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export default axiosInstance;
