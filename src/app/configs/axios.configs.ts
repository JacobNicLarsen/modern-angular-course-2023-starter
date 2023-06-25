import axios from 'axios';
export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
export const api2 = axios.create({
  baseURL: 'https://api.imgflip.com',
});

api.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['token'] = token;
  }
  return config;
});

api.interceptors.response.use((config: any) => {
  return config;
});

export const memeEndpoints = {
  getMemes: 'get_memes',
} as const;
export type MemeEndPointsKeys =
  (typeof memeEndpoints)[keyof typeof memeEndpoints];

export const EndPoints = {
  posts: 'posts',
  todos: 'todos',
} as const;

export type EndPointsKeys = (typeof EndPoints)[keyof typeof EndPoints];
