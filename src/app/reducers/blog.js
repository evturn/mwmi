export default function blog(state = {
  post: {},
  posts: [],
  categories: [],
  category: {},
  filters: {},
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
        ...action.payload,
        isFetching: false,
        isCompleted: true
      });
    }
    case 'FILTER_BLOG': {
      return Object.assign({}, state, {
        ...action.payload,
        isFetching: false,
        isCompleted: true
      });
    }
    case 'FETCHING_ONE':
      return Object.assign({}, state, {
        hasOne: false
      });
    case 'FETCH_ONE_SUCCESS': {
      return Object.assign({}, state, {
        ...action.payload,
        hasOne: true
      });
    }
    case 'UNMOUNT_ONE':
      return Object.assign({}, state, {
        hasOne: false
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