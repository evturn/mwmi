import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';
import md5 from 'spark-md5';

polyfill();

export const GET_BLOG_POSTS_SUCCESS = 'GET_BLOG_POSTS_SUCCESS';
export const GET_BLOG_POSTS_BEGIN = 'GET_BLOG_POSTS_BEGIN';
export const GET_BLOG_POSTS_ERROR = 'GET_BLOG_POSTS_ERROR';

export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_BEGIN = 'GET_POST_BEGIN';
export const GET_POST_ERROR = 'GET_POST_ERROR';

let BLOG_ENDPOINT = 'http://localhost:3000/api/blog';
let POST_ENDPOINT = 'http://localhost:3000/api/blog/post/';

function createRequest(data) {
  return fetch(BLOG_ENDPOINT, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

function requestPost(params, data) {
  console.log(params);
  return fetch(`${POST_ENDPOINT}${params}`, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}

export function getPost() {
  return dispatch => {
    dispatch(getPostBegin());

    return requestPost()
      .then(res => {
        return res.json();
      })
      .then(json => {
        console.log(json);
        dispatch(getPostSuccess(json));
      })
      .catch(err => {
        dispatch(getPostError(err));
      });
  };
}

export function getPostError(error) {
  return {
    type: GET_POST_ERROR,
    message: error
  };
}

export function getPostBegin() {
  return { type: GET_POST_BEGIN };
}

export function getPostSuccess(payload) {
  console.log('=======payload==============');
  console.log(payload);
  console.log('=======payload==============');
  return {
    type: GET_POST_SUCCESS,
    payload: payload
  };
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