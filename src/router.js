import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Statistique from './views/Statistique.vue'
// ne pas oublier les vues 
Vue.use(Router)

// fonctione avec le composant vue-router voir sur internet la doc
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/Statistique',
      name: 'Statistique',
     
      component: Statistique
    }
  ]
})
