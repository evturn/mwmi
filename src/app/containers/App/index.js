import React from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Episodes from 'containers/Episodes'

import withProps from 'utils/connect'

import Trophy from './trophy.png'

import 'sanitize.css/sanitize.css'
import css from './styles.css'

const App = props => (
  <div className={css.site}>
    <div>
      <Header />
      <div className={css.content}>
        <div className={css.hero}>
          <img
            className={css.image}
            src={Trophy}
          />
        </div>
        <Episodes episodes={props.episodes} />
      </div>
      <Footer />
    </div>
  </div>
)

export default withProps(App)
