/* eslint-disable no-undef */
const assert = require('assert')
Feature('Review Restaurants')

Before(({ I }) => {
  I.amOnPage('/')
})
Scenario('reviewing one restaurant', async ({ I }) => {
  I.amOnPage('/')

  I.seeElement('.restaurant_name a')
  I.click(locate('.restaurant_name a').first())

  const username = 'wqeas-01'
  const review = 'cobain review 1'
  I.seeElement('#username')
  I.fillField('#username', username)
  I.seeElement('textarea[name=review]')
  I.fillField('textarea[name=review]', review)
  I.click('#sendReview')

  I.wait(2)
  I.refreshPage()

  const latestReviewUsername = locate('.restaurant-review_item h4').last()
  const latestReviewUsernameValue = await I.grabTextFrom(latestReviewUsername)

  assert.strictEqual(username, latestReviewUsernameValue)
})
