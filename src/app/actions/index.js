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
    console.log(payload);
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
  unmountOne() {
    return {
      type: 'UNMOUNT_ONE'
    };
  },
  fetchError(message) {
    return {
      type: 'FETCH_ERROR',
      message
    };
  },
  enquirySuccess(message) {
    return {
      type: 'ENQUIRY_SUCCESS',
      message
    };
  },
  enquiryError(message) {
    return {
      type: 'ENQUIRY_ERROR',
      message
    };
  },
  filterBlog(payload) {
    return {
      type: 'FILTER_BLOG',
      payload
    }
  }
};

export function fetchPosts(params, query) {
  const route = params.category !== undefined ? `/api/blog/${params.category}` : '/api/blog';
  const url = query !== undefined && query.page !== undefined ? `${route}?page=${query.page}` : route;

  return function(dispatch) {
    dispatch(actions.fetchingAll());

    return fetch(url)
      .then(res => res.json())
      .then(json => {
        dispatch(actions.filterBlog(json));
        dispatch(actions.fetchAllSuccess(json));
      })
      .catch(error => dispatch(actions.fetchError(error)));
  }
}

export function fetchPost(slug) {
  const url = `/api/blog/post/${slug}`;

  return function(dispatch) {
    dispatch(actions.fetchingOne());

    return fetch(url)
      .then(res => res.json())
      .then(json => {
        dispatch(actions.filterBlog(json));
        dispatch(actions.fetchOneSuccess(json));
      })
      .catch(error => dispatch(actions.fetchError(error)));
  }
}

export function unmountPost() {
  return function(dispatch) {
    dispatch(actions.unmountOne());
  }
}