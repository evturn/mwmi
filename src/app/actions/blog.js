import fetch from 'isomorphic-fetch'

const actions = {
  fetchingOne() {
    return {
      type: 'FETCHING_ONE'
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
  }
};

export const filterPosts = props => dispatch => {
  const { params, query, sort } = props;
  const page = query.page ? parseInt(query.page) : 1
  let posts;

  if (params.author) {
    posts = sort.author[params.author];
  } else if (params.category) {
    posts = sort.category[params.category];
  } else {
    posts = sort.all;
  }

  const blogState = setPagination(posts, page);

  dispatch(actions.filterPosts(blogState));
};

export function fetchPost(slug) {
  const url = `/api/blog/post/${slug}`;

  return function(dispatch) {
    dispatch(actions.fetchingOne());

    return fetch(url)
      .then(res => res.json())
      .then(json => dispatch(actions.fetchOneSuccess(json.blog.post)))
      .catch(error => dispatch(actions.fetchError(error)));
  }
}

function setPagination(posts, page) {
  const currentPage = page;
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

  return {
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
}