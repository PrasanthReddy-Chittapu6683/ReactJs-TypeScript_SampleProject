import axios from 'axios';

const SERVICEAPI_URL = "http://localhost:3001/";//process.env.PUBLIC_URL;
const _UrlInstance = axios.create({
    baseURL: SERVICEAPI_URL,
})

export default _UrlInstance;