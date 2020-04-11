import React from 'react'
import ReactDOM from 'react-dom'

import styles from './index.scss'
import less from './styles/base.less'
import { Test } from '@/components/Test'

const Render = () => {
  ReactDOM.render(
    <div className={styles.test}>
      <button className={less.btn}>click me</button>
      <Test></Test>
    </div>,
    document.querySelector('#app')
  )
}

Render()
