import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    category: json.category || null,
    categories: json.categories,
    posts: json.posts,
    receivedAt: Date.now()
  }
}

export function fetchPosts(params) {
  let endpoint = '/api/blog';
  if (params.category !== undefined) {
    endpoint = `/api/blog/${params.category}`;
  }

  return function(dispatch) {
    dispatch(requestPosts());

    return fetch(endpoint)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
      .catch(error => console.log(error))
  }
}