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

export const filterPosts = props => dispatch => {
  const { params, query, sort } = props;

  let posts = sort.all;

  if (params) {
    for (let param in params) {
      if (param !== 'post') {
        posts = sort[param][params[param]];
      }
    }
  }

  const currentPage = query.page ? parseInt(query.page) : 1;
  const perPage = 2;
  const total = posts.length;
  const pages = Math.ceil(posts.length / perPage);
  const buttons = posts.map((item, i) => i + 1).filter(i => i <= pages);
  const previous = currentPage > 1 ? currentPage - 1 : false;
  const next = currentPage < pages ? currentPage + 1 : false;
  const first = ((currentPage - 1) * perPage ) + 1;
  const last = currentPage * perPage;

  const firstWithIndex = first - 1;
  const lastWithIndex = last - 1;

  const showing = posts.map(post => post).filter((post, i) => i >= firstWithIndex && i <= lastWithIndex);

  const blogState = {
    showing,
    pagination: {
      perPage,
      total,
      pages,
      buttons,
      currentPage,
      previous,
      next,
      first,
      last
    }
  };

  dispatch(actions.filterPosts(blogState));
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