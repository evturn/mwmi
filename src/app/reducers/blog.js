export default function blog(state = {
  section: '',
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
  authors: [],
  categories: [],
  posts: [],
  post: {},
  message: '',
  isFetching: false,
  isCompleted: false,
  hasOne: false
}, action) {
  switch (action.type) {
    case 'FILTER_POSTS':
      return Object.assign({}, state, {
        ...action.payload,
        message: '',
      });
    case 'FETCH_POST':
      return Object.assign({}, state, {
        hasOne: false
      });
    case 'FETCH_SUCCESS': {
      return Object.assign({}, state, {
        hasOne: true,
        isFetching: false,
        isCompleted: true,
        post: action.payload
      });
    }
    case 'FETCH_ERROR':
      return Object.assign({}, state, {
        message: action.message,
        isFetching: false,
        isCompleted: true
      });
    case 'NO_POSTS_FOUND':
      return Object.assign({}, state, {
        message: 'This author has yet to post.'
      });
    default:
      return state;
  }
}