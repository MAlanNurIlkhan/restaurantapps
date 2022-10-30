/* eslint-disable accessor-pairs */
import './restaurant-item.js'

class RestaurantList extends HTMLElement {
  /**
     * @param {any} restaurants
     */
  set restaurants (restaurants) {
    this._restaurants = restaurants
    this.render()
  }

  render () {
    this.innerHTML = `
    <style>
      .placeholder {
          font-weight: lighter;
          color: rgba(0,0,0,0.5);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
      }
    </style>`
    this._restaurants.forEach(restaurant => {
      const restaurantListElement = document.createElement('restaurant-item')
      restaurantListElement.restaurant = restaurant
      this.appendChild(restaurantListElement)
    })
  }

  renderError (err) {
    this.innerHTML = `
        <style>
            .placeholder {
                font-weight: lighter;
                color: rgba(0,0,0,0.5);
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        </style>`
    this.innerHTML += `<h2 class="placeholder">${err}</h2>`
  }
}

customElements.define('restaurant-list', RestaurantList)
