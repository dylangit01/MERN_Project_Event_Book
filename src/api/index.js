import axios from 'axios';
// axios is used to handle api calls (through api calls to connect with server side, and server side using express
// routes to get data from MongoDB

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
