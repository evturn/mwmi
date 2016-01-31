import React from 'react';
import xhr from '../../client/xhr';
import { Link } from 'react-router';
import moment from 'moment';

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
    xhr.get(`/api/blog/post/${this.props.params.post}`)
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
          <div className="post-item" data-ks-editable="if-user-blah-blah-blah">
            <Link to={ {pathname: `/blog/post/${this.state.post.slug}` }}>{this.state.post.title}</Link>
            <div className="post-item__caption">By: {this.state.post.author.name.first} | {moment(this.state.post.publishedDate).format('MMM Do YY')}</div>
            <img className="post-item__image" src={this.state.post.image.url} />
            <div className="post-item__body" dangerouslySetInnerHTML={ {__html: this.state.post.content.extended} } />
            <div className="post-item__categories">Posted in | {this.state.post.categories.map((category, i) => {
              return <Link key={i} to={{ pathname: `/blog/${category.key}` }}>{category.name}</Link>;
            })}</div>
          </div>
        </div>
      </div>
    );
  }
}