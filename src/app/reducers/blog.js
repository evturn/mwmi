export default function blog(state = {
  post: {},
  posts: [],
  categories: [],
  category: {},
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