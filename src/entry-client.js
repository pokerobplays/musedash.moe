import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import { get as cookieGet } from 'js-cookie'

import { createApp } from './app'
import './registerServiceWorker'

let titles = []

const changeTitle = (depth, part) => {
  titles[depth] = part
  document.title = titles.filter(Boolean).reverse().join(' - ')
}

const { app, store, router } = createApp({ changeTitle, lang: cookieGet('lang') })

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: 'UA-123973162-5',
    router
  })
}

app.$mount('#app')
