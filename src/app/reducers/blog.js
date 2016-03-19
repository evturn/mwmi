export default function blog(state = {
  section: '',
  filters: {},
  sort: {},
  showing: [],
  pagination: {
    perPage: 2,
    pages: 0,
    total: 0,
    first: 1,
    last: 1,
    buttons: []
  },
  categories: [],
  posts: [],
  post: {},
  isFetching: false,
  isCompleted: false,
  hasOne: false,
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
  }
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
      return Object.assign({}, state, {
        hasOne: true,
        isFetching: false,
        isCompleted: true,
        post: action.payload.post
      });
    }
    case 'FILTER_POSTS':
      return Object.assign({}, state, {
        ...action.payload
      });
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