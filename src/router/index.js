import Vue from 'vue'
import Router from 'vue-router'
import todoList from '@/components/todoList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/todoList',
      name: 'todoList',
      component: todoList
    }
  ]
})
