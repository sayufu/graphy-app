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
      user: null
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
  <nav class="sticky container mx-auto px-2 py-4">
    <div class="flex place-content-between items-center">
      <router-link to="/"><img src="./assets/graphy-logo.png" alt="Graphy logo" class="h-8 md:h-12 hover:scale-95 duration-200" /></router-link>
      <div class="hidden md:flex gap-6 items-center">
        <div v-if="user" class="text-lg">
          Welcome back, <span class="text-primary font-black">{{ user.first_name }}</span>
        </div>
        <router-link v-if="user" to="/login" class="btn-fill" @click.native.prevent="logout()">Log out</router-link>
      </div>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style scoped>

</style>
