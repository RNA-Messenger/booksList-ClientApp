import Axios from 'axios';
import { postBooks } from './services/books';

const api = {
  postBooks
};

export const client = Axios.create({
  baseURL: 'http://nyx.vima.ekt.gr:3000/api'
});

export default api;
