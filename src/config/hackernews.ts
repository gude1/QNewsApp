import axios from 'axios';

// Create an Axios instance with default configurations
export default axios.create({
  baseURL: 'https://hn.algolia.com/api/v1/',
  timeout: 10000,
});
