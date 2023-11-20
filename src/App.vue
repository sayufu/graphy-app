<script>
import {AuthenticationService} from "./authentication/services/authenticationService.service.js";
import {useUserStore} from "./authentication/services/user-store.store.js";
import LoadingSpinner from "./shared/components/loading-spinner.component.vue";
import {userShoppingCartStore} from "./store/services/shopping-cart.store.js";
import {HttpsService} from "./shared/services/https.service.js";
import {RecommendationsService} from "./shared/services/recommendations.service.js";

export default {
  components: {LoadingSpinner},
  data() {
    return {
      visibleMobileBar: false,
      authApi: new AuthenticationService(),
      recommendationService: new RecommendationsService(),
      responsiveNavbarVisible: false,
      aboutDialog: false,
      signOutConfirmationDialog: false,
      shoppingCart: false,
      products: [],
      httpService: new HttpsService(),
      shoppingCartProducts: [],
      confirmCheckoutDialog: false,
    }
  },
  setup() {
    const userStore = useUserStore();

    const setUser = (user) => {
      userStore.setUser(user);
    };

    return { setUser };
  },
  created() {
    const user = localStorage.getItem("user");
    user && this.setUser(JSON.parse(user));

    this.httpService.getAll('products').then((response) => {
      this.products = response.data;
    });
    this.getShoppingCartProducts();
  },
  methods: {
    logout() {
      const userStore = useUserStore();
      userStore.logout();
    },
    showResponsiveNavbar() {
      this.responsiveNavbarVisible = !this.responsiveNavbarVisible;
    },
    showAbout(){
      this.aboutDialog = true;
    },
    getShoppingCartProducts(){
      const cartStore = userShoppingCartStore();
      const productIds = cartStore.getProductIds();
      this.shoppingCartProducts = this.products.filter(product => productIds.includes(product.id));
    },
    showShoppingCart(){
      this.getShoppingCartProducts();
      this.shoppingCart = true;
    },
    deleteProductFromCart(productId){
      const cartStore = userShoppingCartStore();
      cartStore.deleteProduct(productId);
      this.showShoppingCart();
    },
    calculateTotal() {
      const cartStore = userShoppingCartStore();
      const productIds = cartStore.getProductIds();
      const products = this.products.filter(product => productIds.includes(product.id));
      return products.reduce((acc, product) => acc + product.price, 0);
    },
    submitBuy(){
      const cartStore = userShoppingCartStore();
      const userStore = useUserStore();

      const data = {
        id_client: userStore.user.id,
        list_products: cartStore.getProductIds()
      }

      this.httpService.create('create/purchases', data).then((response) => {
        cartStore.clearCart();
        this.shoppingCart = false;
        this.confirmCheckoutDialog = false;

        this.$toast.add({
          severity: 'success',
          summary: 'Success',
          group: 'bl',
          detail: 'Purchase completed successfully',
          life: 3000
        });

        this.recommendationService.addNewPurchaseToGraph().then((response) => {
          console.log(response)
        }).catch((error) => {
          console.log(error);
        });

      }).catch((error) => {
        console.log(error);
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          group: 'bl',
          detail: 'There was an error while processing your purchase',
          life: 3000
        });
      });
    }
  },
  computed: {
    user() {
      return useUserStore().user;
    },
    isAuthenticated() {
      return useUserStore().isAuthenticated;
    },
  },
  watch: {
    shoppingCartProducts: {
      handler(newProducts) {
        this.total = this.calculateTotal();
      },
      deep: true,
    },
  },
}
</script>

<template>
  <nav class="sticky container mx-auto px-4 py-4">
    <div class="flex place-content-between items-center">
      <router-link to="/">
        <img src="./assets/graphy-logo.png" alt="Graphy logo"
             class="h-8 md:h-12 hover:scale-95 duration-200" />
      </router-link>
      <div class="flex gap-6 items-center">
        <div v-if="!user" class="btn-fill hidden sm:flex" @click="showAbout">About</div>
        <div v-if="user" class="text-lg hidden sm:flex">
          Welcome back,&nbsp;<span class="text-primary font-black">{{ user.first_name }}</span>
        </div>
        <div class="hidden sm:block">
          <router-link v-if="user && isAuthenticated" to="/login" @click.native="logout()" class="mx-2">
            <Button icon="pi pi-sign-out" rounded aria-label="Log out" severity="danger" @click="signOutConfirmationDialog=true"  />
          </router-link>
          <router-link v-if="user && isAuthenticated" to="/purchases" class="mx-2">
            <Button icon="pi pi-history" rounded aria-label="Purchases" severity="info" />
          </router-link>
        </div>
        <div class="inline-block md:hidden">
          <i v-if="user && isAuthenticated" class="pi pi-align-justify hover:cursor-pointer" style="font-size: 2rem" @click="showResponsiveNavbar"/>
        </div>
        <Button class="mx-2"
                v-if="user && isAuthenticated" icon="pi pi-shopping-cart" rounded aria-label="Shopping cart" severity="info"
                @click="showShoppingCart" />
      </div>
    </div>
    <div v-if="user && isAuthenticated" class="text-lg sm:hidden">
      Welcome back, <span class="text-primary font-black">{{ user.first_name }}</span>
    </div>
  </nav>

  <div id="responsive-navbar" class="grid w-full" :class="{ 'hidden': !responsiveNavbarVisible }">
    <router-link v-if="user" to="/purchases"
                 class="text-center font-medium text-xl py-4 hover:bg-primary hover:text-white duration-200 border">
      Purchases
    </router-link>
    <router-link v-if="user" to="/login" @click.native.prevent="logout"
                 class="text-center font-medium text-xl py-4 hover:bg-primary hover:text-white duration-200 border">
      Log out
    </router-link>
  </div>

  <Dialog v-model:visible="aboutDialog" modal header="About"
          :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="flex flex-col gap-4 justify-center items-center">
      <h2 class="text-primary md:text-4xl font-bold">Hi there!</h2>
      <p class="text-xl md:text-md">In this university final project for an Algorithmic Complexity course, we have recreated a product's recommendation section usually found in real e-commerces using Prim's graph algorithm. We chose products and recommended them based on their category similarities.</p>
      <div class="flex gap-4 justify-center items-center md:items-baseline md:justify-start">
        <a id="github-link" href="https://github.com/sayufu/graphy-app" target="_blank"><button class="btn-fill">Github Repo</button></a>
      </div>
    </div>
  </Dialog>

  <Sidebar v-model:visible="shoppingCart" position="right" class="w-full md:w-1/4">
    <template #header>
      <div class="flex align-items-center gap-2 mr-auto">
        <span class="font-bold text-2xl">Shopping cart</span>
      </div>
    </template>
    <div class="grid gap-4">
      <div class="grid gap-2 w-full">
        <div>
          <div v-if="this.shoppingCartProducts.length === 0">
            <p>No products in cart</p>
          </div>
          <div v-else>
            <div v-for="product in this.shoppingCartProducts" :key="product.id" class="border px-2 py-4 rounded-lg mb-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2 w-full">
                  <img :src="product.image_url" :alt="product.product" class="object-cover w-20 h-20" />
                  <div class="w-full">
                    <h1 class="font-bold text-base">{{product.product}}</h1>
                    <p class="font-black text-xl text-secondary">${{product.price}}</p>
                  </div>
                </div>
                <Button icon="pi pi-times" severity="danger" text rounded aria-label="Cancel" @click="deleteProductFromCart(product.id)" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between text-2xl font-bold">
        <p>Total </p>
        <p class="text-secondary">${{calculateTotal()}}</p>
      </div>
      <Button class="w-full" icon="pi pi-shopping-cart" aria-label="Shopping cart" severity="info"
              @click="confirmCheckoutDialog=true">Checkout</Button>
    </div>
  </Sidebar>

  <Dialog v-model:visible="confirmCheckoutDialog" modal header="Confirm checkout"
          :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div class="grid gap-4">
      <p class="text-2xl">Are you sure you want to checkout? Total: <span class="text-secondary font-bold">${{calculateTotal()}}</span></p>
      <div class="flex gap-4">
        <Button class="w-full" icon="pi pi-check" aria-label="Cancel checkout" severity="danger"
                @click="confirmCheckoutDialog=false">Cancel</Button>
        <Button class="w-full" icon="pi pi-check" aria-label="Confirm checkout" severity="info"
                @click="submitBuy">Confirm</Button>
      </div>
    </div>
  </Dialog>

  <main>
    <router-view :key="$route.fullPath" />
  </main>
</template>