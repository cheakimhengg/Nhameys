import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import MenuView from '@/views/Menu.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:restaurant/:id',
      name: 'menu',
      component: MenuView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

export default router;
