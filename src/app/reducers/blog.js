export default function blog(state = {
  section: '',
  filters: {},
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