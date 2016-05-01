import React from 'react'
import classNames from 'classnames/bind'
import css from 'less/components/footer.less'

const cx = classNames.bind(css)

export default () => <footer className={cx('footer')}>Copyright 2016 © MWMI | All Rights Reserved</footer>