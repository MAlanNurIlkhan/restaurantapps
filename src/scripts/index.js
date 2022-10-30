import 'regenerator-runtime'
import '../styles/main.css'
import '../styles/responsive.css'
import '../scripts/component/restaurant-list.js'
import '../scripts/component/search-bar.js'
import App from './views/app'
import swRegister from './utils/sw-register'

const hamburgerBtn = document.querySelector('#hamburgerButton')
const mainContent = document.querySelector('#mainContent')
const navDrawer = document.querySelector('#navigationDrawer')

const app = new App({
  button: hamburgerBtn,
  drawer: navDrawer,
  content: mainContent
})

window.addEventListener('hashchange', () => {
  app.renderPage()
})

window.addEventListener('load', () => {
  app.renderPage()
  swRegister()
})
