import fetch from 'isomorphic-fetch'

const actions = {
  fetchingAll() {
    return {
      type: 'FETCHING_ALL'
    };
  },
  fetchingOne() {
    return {
      type: 'FETCHING_ONE'
    };
  },
  fetchAllSuccess(payload) {
    return {
      type: 'FETCH_ALL_SUCCESS',
      payload
    };
  },
  fetchOneSuccess(payload) {
    return {
      type: 'FETCH_ONE_SUCCESS',
      payload
    };
  },
  fetchError(message) {
    return {
      type: 'FETCH_ERROR',
      message
    };
  },
  filterPosts(payload) {
    return {
      type: 'FILTER_POSTS',
      payload
    };
  },
  setPagination(payload) {
    return {
      type: 'SET_PAGINATION',
      payload
    };
  }
};

export const filterPosts = sortedPosts => dispatch => {
  const { params, query, sort } = sortedPosts;

  let filter = sort.all;

    if (params) {
      for (let param in params) {
        if (param !== 'post') {
          filter = sort[param][params[param]];
        }
      }
    }

  dispatch(actions.filterPosts(filter));
}

export function fetchPosts(params, query) {
  const route = params.category !== undefined ? `/api/blog/${params.category}` : '/api/blog';
  const url = query !== undefined && query.page !== undefined ? `${route}?page=${query.page}` : route;

  return function(dispatch) {
    dispatch(actions.fetchingAll());

    return fetch(url)
      .then(res => res.json())
      .then(json => dispatch(actions.fetchAllSuccess(json)))
      .catch(error => dispatch(actions.fetchError(error)));
  }
}

export function fetchPost(slug) {
  const url = `/api/blog/post/${slug}`;

  return function(dispatch) {
    dispatch(actions.fetchingOne());

    return fetch(url)
      .then(res => res.json())
      .then(json => dispatch(actions.fetchOneSuccess(json)))
      .catch(error => dispatch(actions.fetchError(error)));
  }
}