import { combineReducers } from 'redux';

function blog(state = {
  post: {},
  posts: [],
  categories: [],
  category: {},
  pagination: {
    pages: [],
    currentPage: 1,
    first: 1,
    last: 1,
    next: false,
    previous: false,
    total: 0,
    totalPages: 0
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
      const {
        posts, post,
        categories, category } = action.payload;

      return Object.assign({}, state, {
        posts: posts.results,
        categories: categories,
        category: category,
        pagination: {
          pages: posts.pages,
          currentPage: posts.currentPage,
          first: posts.first,
          last: posts.last,
          next: posts.next,
          previous: posts.previous,
          total: posts.total,
          totalPages: posts.totalPages
        },
        isFetching: false,
        isCompleted: true
      });
    }
    case 'FETCHING_ONE':
      return Object.assign({}, state, {
        hasOne: false
      });
    case 'FETCH_ONE_SUCCESS': {
      const { post } = action.payload;

      return Object.assign({}, state, {
        post: {
          slug: post.slug,
          title: post.title,
          image: post.image,
          content: post.content,
          author: post.author,
          categories: post.categories,
          publishedDate: post.publishedDate
        },
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

function enquiry(state = {}, action) {
  switch (action.type) {
    case 'ENQUIRY_SUCCESS':
      return Object.assign({}, state, {
        message: action.message
      });
    case 'ENQUIRY_ERROR':
      return Object.assign({}, state, {
        message: action.message
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({ blog, enquiry });

export default rootReducer;