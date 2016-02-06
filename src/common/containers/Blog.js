import React from 'react';
import xhr from '../../client/xhr';
import { Link } from 'react-router';
import Posts from '../components/Posts';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';

const initialState = store.init();

export default class Blog extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      fetching: false,
      completed: false
    };
  }
  componentDidMount() {
    const endpoint = `/api/blog/${this.props.params.category}`;

    if (this.props.params.category !== undefined) {
      this.fetchPosts(endpoint);
    }


  }
  componentDidUpdate(prevProps) {
    const prev = prevProps.params.category;
    const next = this.props.params.category;

    if (next !== prev) {
      const noParams = '/api/blog';
      const withParams = `/api/blog/${next}`
      const endpoint = next === undefined ? noParams : withParams;

      this.fetchPosts(endpoint);
    }
  }
  render() {
    const {fetching, completed} = this.state;
    let content = null;
    if (!fetching && completed) {
      content = this.renderPosts();
    } else if (fetching && !completed) {
      content = null;
    }
    return (
      <div>
        {content}
      </div>
    );
  }
  fetchPosts(endpoint) {
    this.setState({
      fetching: true,
      completed: false
    });

    xhr.get(endpoint)
      .then(res => res.json())
      .then(json => {
        this.setState({
          posts: json.posts,
          categories: json.categories,
          category: json.category,
          fetching: false,
          completed: true
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          fetching: false,
          completed: true
        });
      });
  }
  renderPosts() {
    return (
      <div className="blog">
        <div className="blog-content">
          <div className="blog-content__header">Showing {this.state.posts.first} - {this.state.posts.last} of {this.state.posts.results.length}</div>
          <Posts posts={this.state.posts} />
          <div className="categories">
            <div className="categories-header">Categories</div>
            <Categories categories={this.state.categories} />
          </div>
        </div>
        <Pagination posts={this.state.posts}/>
      </div>
    );
  }
}