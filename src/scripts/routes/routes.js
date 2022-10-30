import Detail from '../views/pages/detail'
import Favorite from '../views/pages/favorite'
import Recommendation from '../views/pages/recommendation'

const routes = {
  '/': Recommendation,
  '/recommendation': Recommendation,
  '/favorite': Favorite,
  '/detail/:id': Detail
}

export default routes
