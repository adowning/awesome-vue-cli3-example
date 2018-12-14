/** @format */

import Vue from 'vue'
import Cookies from 'js-cookie'
import Filters from './filters'

/* ------------------------Vue Global Config------------------------------ */
Vue.config.productionTip = false

const lang = Cookies.get('lang') || 'en'
Vue.config.lang = lang

/* ------------------------Vue Global Variable------------------------------ */
import { $apis, $utils, $document, $auth, $lodash, $cloudApi } from '@helper'
Vue.prototype.$_ = $lodash
Vue.prototype.$apis = $apis
Vue.prototype.$utils = $utils
Vue.prototype.$cloudApi = $cloudApi
Vue.prototype.$auth = $auth
Vue.prototype.$document = $document
Vue.prototype.$devmode = false
if (process.env.NODE_ENV == 'development') {
  Vue.prototype.$devmode = true
}
for (let key in Filters) {
  Vue.filter(key, Filters[key])
}

/* ------------------------Vue Global Components------------------------------ */
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify, {
  theme: {
    primary: colors.yellow.darken1,
    primarydark: colors.yellow.darken4,
    primarylight: colors.yellow.lighten5,
    accent: colors.yellow.accent4,
    primarytext: colors.grey.darken4,
    secondarytext: colors.grey.darken1,
    divider: colors.grey.lighten1,
    secondary: colors.yellow.lighten5,
    submit: colors.yellow.darken1,
    editicon: colors.grey.lighten2,
    error: colors.red.base,
    info: colors.blue.base,
    success: colors.green.base,
    warning: colors.orange.base
  },
  iconfont: 'fa4', // 'md' || 'mdi' || 'fa' || 'fa4'
  options: {
    // themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary'
      },
      sideToolbar: {},
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: ''
    }
  }
})

import Markdown from '@components/markdown/Index'
Vue.component('Markdown', Markdown)

import MarkdownPreview from '@components/markdown/MarkdownPreview'
Vue.component('MarkdownPreview', MarkdownPreview)

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

import Icon from '@components/Icon'
Vue.component('icon', Icon)

import Arrow from '@components/icons/Arrow'
Vue.component('arrow', Arrow)
