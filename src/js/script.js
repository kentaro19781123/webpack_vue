'use strict'

import module1 from './modules/module_1'
import module2 from './modules/module_2'
import Vue from 'vue'
import App from './modules/module_vue'

const PROJECTNAME = {
  init () {
    const item = document.body.querySelector('.js-item')
    if (!item) {
      return
    }
    module1(item)
  },
  clickEvent (items = document.body.querySelectorAll('.js-item')) {
    if (!items.length) {
      return
    }

    for (const item of items) {
      item.addEventListener('click', () => {
        module2()
      })
    }
  },
  vueContent () {
    new Vue({
      el: '#msg',
      components: { App },
      template: '<App/>'
    })
  }
}

PROJECTNAME.init()
PROJECTNAME.clickEvent()
PROJECTNAME.vueContent()

window.PROJECTNAME = PROJECTNAME
