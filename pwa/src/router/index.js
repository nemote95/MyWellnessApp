import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  // // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/forgot', '/reset'];
  const authRequired = !publicPages.includes(to.path);
  const user = useUserStore();

  if (authRequired && !user.logged_in) {
      user.returnUrl = to.fullPath;
      return '/login';
  }
})

export default router
