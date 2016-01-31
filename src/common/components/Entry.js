import React from 'react';
import {IndexLink, Link} from 'react-router';
import moment from 'moment';

export default class Entry extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="entry-item" data-ks-editable="if-user-blah-blah-blah">
        <div className="entry-item__header">
          <div className="entry-item__header-title"><Link to={ {pathname: `/blog/post/${this.props.slug}` }}>{this.props.title}</Link></div>
          <div className="entry-item__header-caption">{moment(this.props.publishedDate).format('MMM Do YYYY')}</div>
        </div>
        <img className="entry-item__image" src={this.props.image.url} />
        <div className="entry-item__body" dangerouslySetInnerHTML={ {__html: this.props.content.extended} } />
        <div className="entry-item__footer">
          <div className="entry-item__footer-author">By: {this.props.author.name.first}</div>
          <div className="entry-item__footer-categories">Posted in | {this.props.categories.map((category, i) => {
            return <Link key={i} to={{ pathname: `/blog/${category.key}` }}>{category.name}</Link>;
          })}</div>
        </div>
      </div>
    );
  }
}