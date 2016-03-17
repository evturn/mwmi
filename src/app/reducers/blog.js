export default function blog(state = {
  section: '',
  filters: {},
  sort: {},
  data: {
    posts: {
      total: 0,
      results: [],
      currentPage: 1,
      totalPages: 1,
      pages: [],
      previous: false,
      next: false,
      first: 1,
      last: 1
    },
    post: {},
    categories: []
  },
  isFetching: false,
  isCompleted: false,
  hasOne: false
}, action) {
  switch (action.type) {
    case 'FETCHING_ALL':
      return Object.assign({}, state, {
        isFetching: true,
        isCompleted: false
      });
    case 'FETCH_ALL_SUCCESS': {
      return Object.assign({}, state, {
        isFetching: false,
        isCompleted: true,
        ...action.payload
      });
    }
    case 'FETCHING_ONE':
      return Object.assign({}, state, {
        hasOne: false
      });
    case 'FETCH_ONE_SUCCESS': {
      console.log(action.payload);
      return Object.assign({}, state, {
        hasOne: true,
        isFetching: false,
        isCompleted: true,
        data: {
          posts: state.data.posts,
          categories: state.data.categories,
          post: action.payload.data.post
        },
        filters: action.payload.filters
      });
    }
    case 'FETCH_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        isFetching: false,
        isCompleted: true
      });
    default:
      return state;
  }
}