<script>
import {AuthenticationService} from "./authentication/services/authenticationService.service.js";
import {useUserStore} from "./authentication/services/user-store.store.js";
import LoadingSpinner from "./shared/components/loading-spinner.component.vue";

export default {
  components: {LoadingSpinner},
  data() {
    return {
      visibleMobileBar: false,
      authApi: new AuthenticationService(),
      responsiveNavbarVisible: false,
      aboutDialog: false,
      signOutConfirmationDialog: false,
      shoppingCart: false
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
          <Button class="mx-2"
                  v-if="user && isAuthenticated" icon="pi pi-shopping-cart" rounded aria-label="Shopping cart" severity="info"
                  @click="shoppingCart=true" />
        </div>
        <div class="inline-block md:hidden">
          <i v-if="user && isAuthenticated" class="pi pi-align-justify hover:cursor-pointer" style="font-size: 2rem" @click="showResponsiveNavbar"/>
        </div>
      </div>
    </div>
    <div v-if="user && isAuthenticated" class="text-lg sm:hidden">
      Welcome back, <span class="text-primary font-black">{{ user.first_name }}</span>
    </div>
  </nav>

  <div id="responsive-navbar" class="grid w-full" :class="{ 'hidden': !responsiveNavbarVisible }">
    <div v-if="user" class="text-center font-medium text-xl py-4 hover:bg-primary hover:text-white duration-200 border" @click="shoppingCart=true">
      Shopping cart
    </div>
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
  <Sidebar v-model:visible="shoppingCart" position="right">
    <template #header>
      <div class="flex align-items-center gap-2 mr-auto">
        <span class="font-bold">Shopping cart</span>
      </div>
    </template>
    <div class="grid justify-between">
      <div>
        Products
      </div>
      <div>
        Total
      </div>
    </div>
  </Sidebar>
  <main>
    <router-view />
  </main>
</template>

<style scoped>

</style>
