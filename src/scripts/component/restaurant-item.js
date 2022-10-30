/* eslint-disable accessor-pairs */
import { restaurantItemTemplate } from '../views/templates/template-creator'

class Restaurant extends HTMLElement {
  set restaurant (restaurant) {
    this._restaurant = restaurant
    this.render()
  }

  render () {
    this.innerHTML = restaurantItemTemplate(this._restaurant)
  }
}
customElements.define('restaurant-item', Restaurant)
