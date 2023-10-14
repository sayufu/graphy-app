import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../home/pages/home.component.vue";

// Pages

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'Home', component: HomeComponent, meta: { requiresAuth: true }},
    //{ path: '/login', name: 'Log In', component: Login, meta: { requiresAuth: false }},
    { path: '/', redirect: '/home'},
  ]
});

/*
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
})
*/

export default router;