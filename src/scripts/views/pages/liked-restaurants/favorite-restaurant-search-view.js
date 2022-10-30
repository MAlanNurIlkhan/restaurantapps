import { restaurantItemTemplate } from '../../templates/template-creator'

class FavoriteRestaurantSearchView {
  getTemplate () {
    return `
          <div class="content">
            <div class="query-wrapper">
              <input id="query" type="text" placeholder="Search for Favorite Restaurant 🔍">
            </div>
            <h2 class="content_heading">Your Favorite Restaurant</h2>
                <div id="restaurants" class="restaurants">
                </div>
          </div>
          `
  }

  runWhenUserIsSearching (callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value)
    })
  }

  showRestaurants (restaurants) {
    this.showFavoriteRestaurants(restaurants)
  }

  showFavoriteRestaurants (restaurants = []) {
    let html
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(restaurantItemTemplate(restaurant)), '')
    } else {
      html = this._getEmptyRestaurantTemplate()
    }
    document.getElementById('restaurants').innerHTML = html

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'))
  }

  _getEmptyRestaurantTemplate () {
    return '<div class="restaurant-item_not_found restaurants_not_found">Tidak ada Restaurant untuk ditampilkan</div>'
  }
}

export default FavoriteRestaurantSearchView
