import { polyfill } from 'es6-promise';
import fetch from 'isomorphic-fetch';

export const REQUEST_INIT = 'REQUEST_INIT';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const REQUEST_BLOG_SUCCESS = 'REQUEST_BLOG_SUCCESS';
export const REQUEST_POST_SUCCESS = 'GET_POST_SUCCESS';
export const REQUEST_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';

polyfill();

const requestInit = (filter) => {
  return {
    type: REQUEST_INIT,
    filters: filter
  };
};

const requestError = (error) => {
  return {
    type: REQUEST_ERROR,
    message: error
  };
};

const requestBlogSuccess = (payload) => {
  console.log(payload);
  console.log('=======BLOG PAYLOAD========');
  return {
    type: REQUEST_BLOG_SUCCESS,
    payload: payload
  };
};

const getPostSuccess = (payload) => {
  console.log(payload);
  console.log('=======POST PAYLOAD========');
  return {
    type: REQUEST_POST_SUCCESS,
    payload: payload
  };
};

const getCategorySuccess = (payload) => {
  console.log(payload);
  console.log('=======CATEGORY PAYLOAD========');
  return {
    type: REQUEST_CATEGORY_SUCCESS,
    payload: payload
  };
};

const BLOG_ENDPOINT = 'http://localhost:3000/blog';
const POST_ENDPOINT = 'http://localhost:3000/blog/post/';

const request = (endpoint, data) => {
  return fetch(endpoint, {
    method: 'get',
    credentials: 'same-origin',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const requestBlog = () => {
  return dispatch => {
    dispatch(requestInit({}));

    request(BLOG_ENDPOINT)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch(requestBlogSuccess(json))
      })
      .catch(err => dispatch(requestError(err)));
  };
};

export const requestPost = (slug) => {
  return dispatch => {
    dispatch(requestInit({post: slug}));

    request(`${POST_ENDPOINT}${slug}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch(requestPostSuccess(json))
      })
      .catch(err => dispatch(requestError(err)));
  };
};

export const requestCategory = (slug) => {
  return dispatch => {
    dispatch(requestInit({category: slug}));

    request(`${BLOG_ENDPOINT}${slug}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch(requestCategorySuccess(json))
      })
      .catch(err => dispatch(requestError(err)));
  };
};