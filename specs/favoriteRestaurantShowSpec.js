/* eslint-disable no-new */
/* eslint-disable no-undef */
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb'
import FavoriteRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-search-view'
import FavoriteRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/favorite-restaurant-show-presenter'

describe('Showing all favorite restaurants', () => {
  let view

  const renderTemplate = _ => {
    view = new FavoriteRestaurantSearchView()
    document.body.innerHTML = view.getTemplate()
  }

  beforeEach(() => {
    renderTemplate()
  })

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite movies', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)

      new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants })

      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalledTimes(1)
    })
    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item_not_found').length)
          .toEqual(1)

        done()
      })

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
      favoriteRestaurants.getAllRestaurants.and.returnValues([])

      new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants })
    })
  })
  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurant-item').length).toEqual(2)
        done()
      })

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb)
      favoriteRestaurants.getAllRestaurants.and.returnValues([
        {
          id: 11, name: 'A', rating: 3, pictureId: 'Sebuah restaurant A', city: 'Jakarta Utara'
        },
        {
          id: 22, name: 'B', rating: 4, pictureId: 'Sebuah restaurant B', city: 'Jakarta Selatan'
        }
      ])

      new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants })
    })
  })
})
