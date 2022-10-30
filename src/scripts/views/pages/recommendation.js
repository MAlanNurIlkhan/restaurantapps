import RestaurantSource from '../../data/restaurant-source'
import { restaurantItemTemplate } from '../templates/template-creator'

const Recommendation = {
  async render () {
    return `
        <search-bar></search-bar>
        <div class="search-content" id="searchResultContainer">
            <h2 class="content_heading">Search Results</h2>
            <p id="result_counter">Counter</p>
            <restaurant-list class="restaurants"></restaurant-list>
        </div>
        <div class="content">
            <h2 class="content_heading">Recommendation Restaurant</h2>
            <div id="restaurants" class="restaurants">
    
            </div>
        </div>
        `
  },

  async afterRender () {
    const restaurants = await RestaurantSource.recommendationRestaurant()
    const restaurantsContainer = document.querySelector('#restaurants')
    restaurants.forEach(restaurant => {
      restaurantsContainer.innerHTML += restaurantItemTemplate(restaurant)
    })

    const searchElement = document.querySelector('search-bar')
    const searchResultContainer = document.querySelector('#searchResultContainer')
    const restaurantListElement = document.querySelector('restaurant-list')
    searchElement.style.display = 'block'

    searchElement.addEventListener('change', _ => {
      if (!searchElement.value) searchResultContainer.style.display = 'none'
      else searchResultContainer.style.display = 'block'
    })
    const onButtonSearchClicked = _ => {
      const renderResult = results => {
        if (searchResultContainer.style.display === 'none') searchResultContainer.style.display = 'block'
        restaurantListElement.restaurants = results
        document.getElementById('result_counter').innerText = `${results.length} restaurant ditemukan...`
      }
      const fallbackResult = errormsg => { restaurantListElement.renderError(errormsg) }
      RestaurantSource.searchRestaurant(searchElement.value).then(renderResult).catch(fallbackResult)
    }
    searchElement.clickEvent = onButtonSearchClicked
  }
}

export default Recommendation
