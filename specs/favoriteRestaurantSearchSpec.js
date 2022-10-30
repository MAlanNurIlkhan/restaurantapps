/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-presenter'
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view'

describe('Searching restaurant', () => {
  let presenter
  let favoriteRestaurants
  let view

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
    presenter = new FavoriteRestaurantSearchPresenter({ favoriteRestaurants, view })
  }

  beforeEach(() => {
    setRestaurantSearchContainer()
    constructPresenter()
  })

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query')
    queryElement.value = query
    queryElement.dispatchEvent(new Event('change'))
  }

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a')

      expect(presenter.latestQuery)
        .toEqual('restaurant a')
    })
    it('should ask the model to search for liked restaurants', () => {
      searchRestaurants('restaurant a')

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('restaurant a')
    })
    it('should show the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1 }])
      const foundRestaurants = document.querySelectorAll('.restaurant-item')
      expect(foundRestaurants.length).toEqual(1)

      presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }])
      expect(document.querySelectorAll('.restaurant-item').length).toEqual(2)
    })
    it('should show the name of the found restaurants', () => {
      presenter._showFoundRestaurants([{ id: 1, name: 'Satu' }])
      expect(document.querySelectorAll('.restaurant_name').item(0).textContent)
        .toEqual('Satu')

      presenter._showFoundRestaurants(
        [{ id: 1, name: 'Satu' }, { id: 2, name: 'Dua' }]
      )

      const restaurantNames = document.querySelectorAll('.restaurant_name')
      expect(restaurantNames.item(0).textContent).toEqual('Satu')
      expect(restaurantNames.item(1).textContent).toEqual('Dua')
    })
    it('should show the restaurant found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          const restaurantNames = document.querySelectorAll('.restaurant_name')
          expect(restaurantNames.item(0).textContent).toEqual('restaurant abc')
          expect(restaurantNames.item(1).textContent).toEqual('ada juga restaurant abcde')
          expect(restaurantNames.item(2).textContent).toEqual('ini juga boleh restaurant a')

          done()
        })
      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 111, name: 'restaurant abc' },
        { id: 222, name: 'ada juga restaurant abcde' },
        { id: 333, name: 'ini juga boleh restaurant a' }
      ])

      searchRestaurants('restaurant a')
    })
  })

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ')
      expect(presenter.latestQuery.length).toEqual(0)
      searchRestaurants('     ')
      expect(presenter.latestQuery.length).toEqual(0)
      searchRestaurants('')
      expect(presenter.latestQuery.length).toEqual(0)
      searchRestaurants('\t')
      expect(presenter.latestQuery.length).toEqual(0)
    })
    it('should show all favorite restaurants', () => {
      searchRestaurants('    ')

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1)
    })
  })

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants')
        .addEventListener('restaurants:updated', () => {
          expect(document.querySelectorAll('.restaurant-item_not_found').length)
            .toEqual(1)
          done()
        })

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([])

      searchRestaurants('restaurant a')
    })
    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant').length).toEqual(0)
        done()
      })

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([])

      searchRestaurants('restaurant a')
    })
  })
})
