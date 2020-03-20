import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Filter from '../views/Filter.vue'
import Assemble from '../views/Assemble.vue'
import Fight from '../views/Fight.vue'
import ViewTeam from '../views/ViewTeam.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/filter',
    name: 'Filter',
    component: Filter
  },
  {
    path: '/assemble',
    name: 'Assemble',
    component: Assemble
  },
  {
    path: '/fight',
    name: 'Fight',
    component: Fight
  },
  {
    path: '/viewTeam',
    name: 'ViewTeam',
    component: ViewTeam
  }
]

const router = new VueRouter({
  routes
})

export default router
