import * as api from '../api';
import { FETCH_ALL, CREATE, DELETE, UPDATE } from '../constants/actionTypes'

// Action Creators
export const getPosts = () => async(dispatch) => {
  try {
    const {data} = await api.fetchPosts();    // Here, const response = await api.fetchPosts(), since response has data object, we destructing it directly as { data }
    dispatch({type: FETCH_ALL, payload: data})
  } catch (err) {
    console.log(err.message)
  }
};

export const createPost = (post) => async(dispatch) => {
  try {
   const {data} = await api.createPost(post);
   dispatch({type: CREATE, payload: data})
  } catch (e) {
    console.log(e.message)
  }
};

export const updatePost = (id, post) => async(dispatch) => {
  try {
    const {data} = await api.updatePost(id, post);
    dispatch({type: UPDATE, payload: data})
  } catch(e) {
    console.log(e)
  }
};

export const deletePost = id => async(dispatch) => {
  try{
   await api.deletePost(id);
   dispatch({type: DELETE, payload: id})
  } catch (e) {
    console.log(e)
  }
};

export const likePost = id => async(dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({type: UPDATE, payload: data})
  } catch(e) {
    console.log(e)
  }
};
