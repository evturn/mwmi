import fetch from 'isomorphic-fetch'

const actions = {
  fetchPost: ()         => ({ type: 'FETCH_POST' }),
  fetchSuccess: payload => ({ type: 'FETCH_SUCCESS', payload }),
  fetchError: message   => ({ type: 'FETCH_ERROR', message }),
  filterPosts: payload  => ({ type: 'FILTER_POSTS', payload })
};

export const filterPosts = props => dispatch => {
  const { params, query, sort } = props;
  const page = query.page ? parseInt(query.page) : 1;
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

function setPagination(posts, page) {
  const currentPage = page;
  const perPage = 2;
  const total = posts.length;
  const pages = Math.ceil(posts.length / perPage);
  const previous = currentPage > 1 ? currentPage - 1 : false;
  const next = currentPage < pages ? currentPage + 1 : false;
  const first = ((currentPage - 1) * perPage ) + 1;
  const last = currentPage * perPage;
  const buttons = posts.map((item, i) => i + 1).filter(i => i <= pages);
  const showing = posts.map(post => post).filter((post, i) => i >= first - 1 && i <= last - 1);

  return {
    showing,
    pagination: {
      perPage, total, pages, currentPage,
      buttons, previous, next, first, last
    }
  };
}

export const fetchPost = slug => dispatch => {
  dispatch(actions.fetchPost());

  return fetch(`/api/blog/post/${slug}`)
    .then(res => res.json())
    .then(res => dispatch(actions.fetchSuccess(res.blog.post)))
    .catch(err => dispatch(actions.fetchError(err)));
};