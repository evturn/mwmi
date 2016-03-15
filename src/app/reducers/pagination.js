export default function pagination(state={
  pages: [],
  currentPage: 1,
  first: 1,
  last: 1,
  next: false,
  previous: false,
  total: 0,
  results: [],
  totalPages: 0
}, action) {
  switch (action.type) {
    case 'FILTER_BLOG': {
      const { posts } = action.payload
      return Object.assign({}, state, {
        ...posts
      });
    }
    default:
      return state;
  }
}