<script>
import {AuthenticationService} from "./authentication/services/authenticationService.service.js";
import {useUserStore} from "./authentication/services/user-store.store.js";

export default {
  data() {
    return {
      visibleMobileBar: false,
      authenticationPaths: new Set([
        "/login"
      ]),
      authApi: new AuthenticationService(),
      user: null,
      responsiveNavbarVisible: false,
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
    this.user = JSON.parse(user);
  },
  methods: {
    isAnAuthenticationPath(path) {
      return this.authenticationPaths.has(path);
    },
    logout() {
      location.reload();
      const userStore = useUserStore();
      userStore.logout();
    },
    showResponsiveNavbar(){
      this.responsiveNavbarVisible = !this.responsiveNavbarVisible;
    }
  },
  watch: {
    $route(to, from) {
      if (!this.user && !this.isAnAuthenticationPath(to.path)) {
        const user = localStorage.getItem("user");
        user && this.setUser(JSON.parse(user));
        this.user = JSON.parse(user);
      }
    },
  }
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
        <div v-if="user" class="text-lg hidden sm:flex">
          Welcome back, <span class="text-primary font-black">{{ user.first_name }}</span>
        </div>
        <router-link v-if="user" to="/login" class="btn-fill hidden sm:flex" @click.native.prevent="logout()">
          Log out
        </router-link>
        <router-link v-if="user" to="/purchases" class="btn-fill hidden sm:flex">
          Purchases
        </router-link>
        <div class="inline-block md:hidden">
          <i v-if="user" class="pi pi-align-justify hover:cursor-pointer" style="font-size: 2rem" @click="showResponsiveNavbar()"/>
        </div>
      </div>
    </div>
    <div v-if="user" class="text-lg sm:hidden">
      Welcome back, <span class="text-primary font-black">{{ user.first_name }}</span>
    </div>
  </nav>

  <div id="responsive-navbar" class="grid w-full" :class="{ 'hidden': !responsiveNavbarVisible }">
    <router-link v-if="user" to="/purchases"
                 class="text-center font-medium text-xl py-4 hover:bg-primary hover:text-white duration-200 border">
      Purchases
    </router-link>
    <router-link v-if="user" to="/login" @click.native.prevent="logout()"
                 class="text-center font-medium text-xl py-4 hover:bg-primary hover:text-white duration-200 border">
      Log out
    </router-link>
  </div>
  <main>
    <router-view />
  </main>
</template>

<style scoped>

</style>
