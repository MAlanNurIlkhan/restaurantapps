import RestaurantSource from '../../data/restaurant-source'
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'
import UrlParser from '../../routes/url-parser'
import LikeButtonPresenter from '../../utils/like-button-presenter'
import { restaurantDetailTemplate } from '../templates/template-creator'

const Detail = {
  async render () {
    return `
        <div id="restaurant" class="restaurant"></div>
        <div id="likeButtonContainer"></div>
      `
  },

  async afterRender () {
    const url = UrlParser.parseActiveUrlWithoutCombiner()
    const restaurant = await RestaurantSource.detailRestaurant(url.id)
    const restaurantContainer = document.querySelector('#restaurant')
    restaurantContainer.innerHTML = restaurantDetailTemplate(restaurant)

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        city: restaurant.city
      }
    })

    document.querySelector('#sendReview').addEventListener('click', _ => {
      const formData = new FormData(document.querySelector('#addReview'))
      const object = {}
      for (const pair of formData.entries()) {
        object[pair[0]] = pair[1]
      }
      RestaurantSource.addNewReview(object).then(resp => {
        if (resp === 'success') location.reload(true)
      }).catch(err => alert(err))
    })
  }
}

export default Detail
