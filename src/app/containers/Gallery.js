import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import css from 'less/components/gallery.less';

const cx = classNames.bind(css);

class Gallery extends Component {
  render() {
    const { gallery } = this.props;

    return (
      <div className={cx('root')}>
        <ul className={cx('galleries')}>{gallery.map(album =>
          <li key={album.key} className={cx('album')}>
            <Link to={{ pathname: `/gallery/${album.key}` }}>
              <div className={cx('box')}>
                <div className={cx('hero')} style={{ backgroundImage: `url(${album.heroImage.secure_url})` }} />
                <div className={cx('name')}>{album.name}</div>
              </div>
            </Link>
          </li>
        )}</ul>
      </div>
    );
  }
}

Gallery.propTypes ={
  gallery: PropTypes.array,
  dispatch: PropTypes.func
}

export default connect(
  state => ({
    gallery: state.gallery
  })
)(Gallery);