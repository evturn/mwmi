import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(payload) {
  return {
    type: RECEIVE_POSTS,
    payload
  }
}

export function fetchPosts(params, query) {
  const route = params.category !== undefined ? `/api/blog/${params.category}` : '/api/blog';
  const url = query !== undefined && query.page !== undefined ? `${route}?page=${query.page}` : route;

  return function(dispatch) {
    dispatch(requestPosts());

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
      .catch(error => console.log(error))
  }
}