import React from 'react';
import xhr from '../../client/xhr';
import { Link } from 'react-router';
import Post from '../components/Post'

export default class BlogPost extends React.Component {
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
    this.fetchPost(`/api/blog/post/${this.props.params.post}`);
  }
  render() {
    let content;
    if (!this.state.fetching && this.state.completed) {
      content = this.renderPost();
    } else if (this.state.fetching && !this.state.completed) {
      content = null;
    }
    return (
      <div className="post">
        <div className="post__header">
          <div className="post__header-back">
            <Link to={{pathname: `/blog` }}><i className="fa fa-long-arrow-left"></i> back to the blog</Link>
          </div>
        </div>
        {content}
      </div>
    );
  }
  renderPost() {
    return (
      <Post
        slug={this.state.post.slug}
        title={this.state.post.title}
        author={this.state.post.author}
        publishedDate={this.state.post.publishedDate}
        image={this.state.post.image}
        content={this.state.post.content}
        categories={this.state.post.categories}
      />
    );
  }
  fetchPost(endpoint) {
    this.setState({
      fetching: true
    });

    xhr.get(endpoint)
      .then(res => res.json())
      .then(json => {
        this.setState({
          post: json.post,
          posts: json.posts,
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
}