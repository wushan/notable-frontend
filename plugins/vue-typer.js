import Vue from 'vue'
// if (typeof window !== 'undefined') {
//   var VueTyperPlugin = require('vue-typer').default
//   Vue.use(VueTyperPlugin)
// }
if (process.BROWSER_BUILD) {
  var VueTyperPlugin = require('vue-typer').default
  Vue.use(VueTyperPlugin) 
}