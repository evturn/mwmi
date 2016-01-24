import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import md5 from 'spark-md5';

polyfill();

export const GET_BLOG_POSTS_SUCCESS = 'GET_BLOG_POSTS_SUCCESS';
export const GET_BLOG_POSTS_BEGIN = 'GET_BLOG_POSTS_BEGIN';
export const GET_BLOG_POSTS_ERROR = 'GET_BLOG_POSTS_ERROR';

let API_ENDPOINT = 'http://localhost:3000/api/blog';

function createRequest(data) {
  return fetch(API_ENDPOINT, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}


export function getBlogPostsSuccess(payload) {
  console.log('=======payload==============');
  console.log(payload);
  console.log('=======payload==============');
  return {
    type: GET_BLOG_POSTS_SUCCESS,
    payload: payload
  };
}

export function getBlogPostsError(error) {
  return {
    type: GET_BLOG_POSTS_ERROR,
    message: error
  };
}

export function getBlogPostsBegin() {
  return { type: GET_BLOG_POSTS_BEGIN };
}

export function getBlogPosts() {
  return dispatch => {
    dispatch(getBlogPostsBegin());

    return createRequest()
      .then(res => {
        return res.json();
      })
      .then(json => {
        dispatch(getBlogPostsSuccess(json));
      })
      .catch(err => {
        dispatch(getBlogPostsError(err));
      });
  };
}