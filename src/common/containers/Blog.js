import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Pagination from '../components/Pagination';
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
        <div className="posts">{this.state.posts.results.map((post, i) => {
          return (
            <div key={i} className="post-item" data-ks-editable="if-user-blah-blah-blah">
              <Link to={ {pathname: `/blog/post/${post.slug}` }}>{post.title}</Link>
              <div className="post-item__caption">By: {post.author.name.first} | Posted in | {post.publishedDate}</div>
              <img className="post-item__image" src={post.image.url} />
              <div className="post-item__body" dangerouslySetInnerHTML={ {__html: post.content.extended} } />
            </div>
          );
        })}</div>
        <div className="categories">
          <div className="categories-header">Categories</div>
          <ul className="categories-list">
            <li className="category-item"><Link to="/blog"><span className="category-item__link">All Categories</span></Link></li>
            {this.state.categories.map((category, i) => {
              return (
                <li key={i} className="category-item">
                  <Link to={{ pathname: `/blog/${category.key}` }}>
                    <span className="category-item__link">{category.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

      </div>
    );
  }
}

Blog.propTypes = {
  posts: PropTypes.object,
  categories: PropTypes.array,
  filters: PropTypes.object,
  post: PropTypes.object,
  category: PropTypes.object,
  isFetching: PropTypes.bool,
  completed: PropTypes.bool,
  dispatch: PropTypes.func
}