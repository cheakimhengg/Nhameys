import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import MenuView from '@/views/Menu.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/menu/:id',
      name: 'menu',
      component: MenuView,
    },
  ],
});

export default router;
