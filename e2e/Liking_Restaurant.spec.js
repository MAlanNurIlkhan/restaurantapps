/* eslint-disable no-undef */
const assert = require('assert')
Feature('Liking Restaurants')

Before(({ I }) => {
  I.amOnPage('/#/favorite')
})

Scenario('Show empty liked restaurants', ({ I }) => {
  I.seeElement('#query')
  I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item_not_found')
})

Scenario('liking one restaurant', ({ I }) => {
  I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item_not_found')

  I.amOnPage('/')

  I.seeElement('.restaurant_name a')
  I.click(locate('.restaurant_name a').first())

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.restaurant-item')
})

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item_not_found')

  I.amOnPage('/')

  I.seeElement('.restaurant_name a')

  const firstRestaurant = locate('.restaurant_name a').first()
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant)
  I.click(firstRestaurant)

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.restaurant-item')
  const likedRestaurantName = await I.grabTextFrom('.restaurant_name')

  assert.strictEqual(firstRestaurantName, likedRestaurantName)
})

Scenario('unliking one favorite restaurant', async ({ I }) => {
  I.amOnPage('/')

  I.seeElement('.restaurant_name a')
  I.click(locate('.restaurant_name a').first())

  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.seeElement('.restaurant_name a')

  I.click(locate('.restaurant_name a').first())
  I.seeElement('#likeButton')
  I.click('#likeButton')

  I.amOnPage('/#/favorite')
  I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item_not_found')
})

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada Restaurant untuk ditampilkan', '.restaurant-item_not_found')

  I.amOnPage('/')

  I.seeElement('.restaurant_name a')

  const titles = []

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant_name a').at(i))
    I.seeElement('#likeButton')
    I.click('#likeButton')
    titles.push(await I.grabTextFrom('.restaurant_title'))
    I.amOnPage('/')
  }

  I.amOnPage('/#/favorite')
  I.seeElement('#query')

  const searchQuery = titles[1].substring(1, 3)
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1)

  I.fillField('#query', searchQuery)
  I.pressKey('Enter')

  const visibleLikedRestaurant = await I.grabNumberOfVisibleElements('.restaurant-item')
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurant)

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.restaurant_name').at(index + 1))
    assert.strictEqual(title, visibleTitle)
  })
})
