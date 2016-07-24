import React from 'react'

import Header from 'components/Header'
import Footer from 'components/Footer'
import Episodes from 'containers/Episodes'

import Trophy from './trophy.png'

import 'sanitize.css/sanitize.css'
import css from './styles.css'

const App = props => (
  <div className={css.site}>
    <div>
      <Header />
      <div className={css.content}>
        <div className={css.hero}>
          <img className={css.image} src={Trophy} />
        </div>
        <Episodes episodes={props.episodes} />
      </div>
      <Footer user={props.user} />
    </div>
  </div>
)

export default App
