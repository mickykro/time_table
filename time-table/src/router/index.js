import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import admin from '../views/Admin'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'amdin',
    component: admin
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
