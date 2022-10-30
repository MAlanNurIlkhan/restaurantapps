import CONFIG from '../../globals/config'
import 'lazysizes'
import 'lazysizes/plugins/parent-fit/ls.parent-fit'

const restaurantDetailTemplate = (restaurant) => {
  let categories = ''
  let foods = ''
  let drinks = ''
  let reviews = ''
  restaurant.categories.forEach(category => {
    categories += ` ${category.name};`
  })
  restaurant.menus.foods.forEach(food => {
    foods += `<li>${food.name}</li>`
  })
  restaurant.menus.drinks.forEach(drink => {
    drinks += `<li>${drink.name}</li>`
  })
  restaurant.customerReviews.forEach(review => {
    reviews += reviewTemplate(review)
  })
  const htmlStr = `
    <h2 class="restaurant_title">${restaurant.name}</h2>
    <img class="restaurant_poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
    <div class="restaurant_info">
    <h3>Information</h3>
        <h4>Address</h4>
        <p>${restaurant.address}, ${restaurant.city}</p>
        <h4>Rating</h4>
        <p>${restaurant.rating}</p>
        <h4>Categories</h4>
        <p>${categories}</p>
    </div>
    <div class="restaurant_overview">
        <h3>Description</h3>
        <p>${restaurant.description}</p>
    </div>
    <div class="restaurant_info">
      <h4>Foods</h4>
      <div class="restaurant_info_menu">
        <ul>
          ${foods}
        </ul>
      </div>
    </div>
    <div class="restaurant_info">
      <h4>Drinks</h4>
      <div class="restaurant_info_menu">
        <ul>
          ${drinks}
        </ul>
      </div>
    </div>
    </div>
    <h3 class="restaurant-review_header">Review</h3>
    <div class="restaurant-review_container">
      ${reviews}
      <div class="restaurant-review">
        <div class="restaurant-review_form">
          <form id="addReview">
            <input type="text" id="restaurantid" name="id" value="${restaurant.id}" hidden></input>
            <p>
              <label class="input-label" for="username">Masukkan nama Anda</label>
              <input type="text" id="username" name="name" required></input>
            </p>
            <p>
              <label class="textarea-label" for="review">Ceritakan pengalaman Anda </label>
              <textarea name="review" name="review" required></textarea>
            </p>
            <p>
              <button type="button" id="sendReview">Kirim</button>
            </p>
          </form>
        </div>
    </div>
    </div>
    `
  return htmlStr
}

const restaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item_header">
        <picture>
          <source media="(min-width: 800px)" data-srcset="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}">
          <img class="restaurant-item_header_poster lazyload" alt="${restaurant.name || '-'}"
              data-src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL_SMALL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}"
              sizes="(min-width: 800px) 480px, 800px">
        </picture>
        <div class="restaurant-item_header_rating">
            <p>⭐️<span class="restaurant-item_header_rating_score">${restaurant.rating || '-'}</span></p>
        </div>
        <div class="restaurant-item_header_city">
            <p><span class="restaurant-item_header_city_str">${restaurant.city || '-'}</span></p>
        </div>
    </div>
    <div class="restaurant-item_content">
        <h3 class="restaurant_name"><a href="${`/#/detail/${restaurant.id}`}">${restaurant.name || '-'}</a></h3>
    </div>
  </div>
  `

const reviewTemplate = (review) => `
  <div class="restaurant-review">
      <div class="restaurant-review_item">
        <h5>${review.date}</h5>
        <h4>${review.name}</h4>
        <p>${review.review}</p>
      </div>
  </div>`

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
  </button>
`

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-thumbs-up" aria-hidden="true"></i>
    <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>
  </button>
`

export {
  restaurantItemTemplate,
  restaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate
}
