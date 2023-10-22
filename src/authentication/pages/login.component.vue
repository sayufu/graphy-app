<script>
import {AuthenticationService} from "../services/authenticationService.service.js";
import {useUserStore} from "../services/user-store.store.js";
import { useToast } from 'primevue/usetoast';

export default {
  name: 'LoginComponent',
  components: {},
  data() {
    return {
      errorMessage: '',
      username: '',
      password: '',
      authApi: new AuthenticationService(),
      toast: useToast()
    }
  },
  setup() {
    const userStore = useUserStore();
    const setUser = (user) => {
      userStore.setUser(user);
    };
    return { setUser };
  },
  methods: {
    login() {
      this.errorMessage = '';
      this.authApi.signIn(this.username, this.password).then((user) => {
        this.setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        this.$router.push("/products");
      }).catch(err => {this.errorMessage = 'Incorrect username or password';})
    },
    resetErrorMessage() {
      this.errorMessage = '';
    },
  },
};
</script>

<template>
  <div class="grid md:flex items-center text-center md:text-justify h-screen overflow-hidden">
    <div class="flex hidden sm:block md:w-1/2 w-full">
      <img class="w-auto rounded" src="src/assets/login-image.jpg" alt="Hero image">
    </div>
    <form @submit.prevent="login" class="grid gap-8 justify-center p-8 md:w-1/2">
      <h1 class="text-6xl font-black">Welcome</h1>
      <div class="grid gap-2 md:w-[600px]">
        <div class="flex flex-col gap-1">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" aria-describedby="username-help"  placeholder="Enter your email" @input="resetErrorMessage" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="username">Password</label>
          <InputText id="password" type="password" v-model="password" aria-describedby="username-help" placeholder="Enter your password" @input="resetErrorMessage" />
        </div>
        <p class="text-red-700" v-if="errorMessage">{{ errorMessage }}</p>
      </div>
      <div class="grid gap-2">
        <button class="btn-fill py-4" type="submit">Sign in</button>
        <p>Try username: testing, password: testing</p>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>