import {createRouter, createWebHistory} from "vue-router";
import HomeComponent from "../home/pages/home.component.vue";
import LoginComponent from "../authentication/pages/login.component.vue";
import ProductsComponent from "../store/pages/products.component.vue";
import ProductDetails from "../store/pages/product-details.component.vue";

// Pages

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'Home', component: HomeComponent, meta: { requiresAuth: true }},
    { path: '/login', name: 'Log In', component: LoginComponent, meta: { requiresAuth: false }},
    { path: '/products', name: 'Products', component: ProductsComponent, meta: { requiresAuth: true }},
    { path: '/products/:id', name: 'Product', component: ProductDetails, meta: { requiresAuth: true }},
    //{ path: '/:notFound(.*)', redirect: '/home'},
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