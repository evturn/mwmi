import xhr from '../../client/xhr';

class Store {
  constructor() {
    this.fetching = true;
    this.completed = false;
    this.posts = null;
    this.categories = null;
    this.get = this.get;
  }
  get() {
    return {
      posts: this.posts,
      categories: this.categories
    };
  }
  init() {
    return new Promise((resolve, reject) => {
      xhr.get('/api/locals')
        .then(res => res.json())
        .then(json => {
          const payload = {
            posts: json.posts,
            categories: json.categories,
            fetching: false,
            completed: true
          };

          this.posts = json.posts;
          this.categories = json.categories;
          this.fetching = false;
          this.completed = true;

          resolve(payload);
        })
        .catch(err => console.log(err));
    });
  }
};

const store = new Store();

export default store;