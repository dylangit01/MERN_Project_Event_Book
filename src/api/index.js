import axios from 'axios';
// axios is used to handle api calls (through api calls to connect with server side, and server side using express
// routes to input/output data from MongoDB

// const url = 'https://event-book-project.herokuapp.com/posts';

const url = 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);
