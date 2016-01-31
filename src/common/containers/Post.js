import React from 'react';
import xhr from '../../client/xhr';
import { Link } from 'react-router';

export default class Post extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fetching: false,
      completed: false,
      posts: null,
      post: null
    }
  }
  componentDidMount() {
    this.setState({
      fetching: true
    });
    xhr(`/api/blog/post/${this.props.params.post}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          post: json.post,
          posts: json.posts,
          fetching: false,
          completed: true
        });
      })
      .catch(err => console.log(err));
  }
  render() {
    let content;
    if (!this.state.fetching && this.state.completed) {
      content = this.renderPost();
    } else if (this.state.fetching && !this.state.completed) {
      content = 'Loading...';
    }
    return (
      <div className="container blog-detail">
        {content}
      </div>
    );
  }
  renderPost() {
    return (
      <div className="wrapper">
        <p className="navigate-link"><Link to={{pathname: `/blog` }}><i className="fa fa-long-arrow-left"></i> back to the blog</Link></p>
        <div className="entry">
          <div className="title-container">
            <h1 className="text-header">{this.state.post.title}</h1>
            <h5 className="meta">{this.state.post.author.name.first}</h5>
            <img className="post-item__image" src={this.state.post.image.url} />
          </div>
          <div className="body-container">{this.state.post.content.extended}</div>
        </div>
      </div>
    );
  }
}