import axios from 'axios';
// axios is used to handle api calls (through api calls to connect with server side, and server side using express routes to input/output data from MongoDB

// const url = 'https://event-book-project.herokuapp.com/posts';    ==> This url is used when App server is on Heroku server

const API = axios.create({ baseURL: 'https://event-book-project.herokuapp.com/' });

API.interceptors.request.use(req => {
  if(localStorage.getItem('profile')) {
    req.headers.authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token }`
  }
  return req;
});

export const fetchPosts = () => API.get('/posts');

// export const fetchPosts = async () => {
//   try {
//     console.log('this is a test')
//     return await API.get('/posts')
//   } catch( e ) {
//     console.log(e)
//   }
// }

export const createPost = (newPost) => API.post('/posts', newPost);

export const updatePost = (id, updatedPost) => API.patch(`/posts/${ id }`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${ id }`);

export const likePost = (id) => API.patch(`/posts/${ id }/likepost`);

export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);
