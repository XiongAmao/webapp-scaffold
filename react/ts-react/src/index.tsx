import React from 'react'
import ReactDOM from 'react-dom'

import styles from './index.scss'
import less from './styles/base.less'

const RunApp = () => {
  ReactDOM.render(
    <div className={styles.test}>
      <button className={less.btn}>click me</button>
    </div>,
    document.querySelector('#app')
  )
}

RunApp()
