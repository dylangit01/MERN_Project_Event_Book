import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes';

const posts = (posts = [], action) => {
  switch(action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map(post => post._id === action.payload._id ? action.payload : post);
    case DELETE:
      return posts.filter(post => post._id !== action.payload);    // here payload is the "id", because action
    // return the payload is "id"
    default:
      return posts
  }
};

export default posts;
