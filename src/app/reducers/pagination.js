export default function pagination(state={
  first: 1,
  last: 1,
  pages: [1],
  totalPages: 1,
  currentPage: 1,
  previous: false,
  next: false,
  total: 1,
  results: []
}, action) {
  switch (action.type) {
    default:
      return state;
  }
}