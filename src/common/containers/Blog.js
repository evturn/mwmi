import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Pagination from '../components/Pagination';
import Posts from '../components/Posts';
import Categories from '../components/Categories';
import xhr from '../../client/xhr';

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      completed: false,
      posts: null,
      categories: null,
      category: null
    }
  }
  componentDidMount() {
    this.setState({
      fetching: true
    });

    xhr('/api/blog')
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
      .catch(err => console.log(err));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.category !== this.props.params.category) {
      this.setState({
        fetching: true
      });
      xhr(`/api/blog/${nextProps.params.category}`)
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
        .catch(err => console.log(err));
    }
  }
  render() {
    let content;
    let pagination;
    if (!this.state.fetching && this.state.completed) {
      content = this.renderContent();
      pagination = <Pagination posts={this.state.posts}/>;
    } else if (this.state.fetching && !this.state.completed) {
      content = 'Loading...';
      pagination = null;
    }
    return (
      <div className="blog">
        {content}
        {pagination}
      </div>
    );
  }
  renderContent() {
    return (
      <div className="blog-content">
        <div className="blog-content__header">Showing {this.state.posts.first} of {this.state.posts.total}</div>
        <Posts posts={this.state.posts} />
        <div className="categories">
          <div className="categories-header">Categories</div>
          <Categories categories={this.state.categories} />
        </div>
      </div>
    );
  }
}