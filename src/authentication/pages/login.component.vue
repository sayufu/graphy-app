<script>
import {AuthenticationService} from "../services/authenticationService.service.js";
import {useUserStore} from "../services/user-store.store.js";
import { useToast } from 'primevue/usetoast';
import LoadingSpinner from "../../shared/components/loading-spinner.component.vue";
import {HttpsService} from "../../shared/services/https.service.js";

export default {
  name: 'LoginComponent',
  components: {LoadingSpinner},
  data() {
    return {
      errorMessage: '',
      username: '',
      password: '',
      authApi: new AuthenticationService(),
      httpService: new HttpsService(),
      credentialsDialog: false,
      credentials: []
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
    showCredentials(){
      this.httpService.getAll('users').then((response) => {
        this.credentials = response.data;
      });
      this.credentialsDialog = true;
    },
    autoComplete(username, password){
      this.username = username;
      this.password = password;
      this.credentialsDialog = false;
    }
  },
};
</script>

<template>
  <div class="grid md:flex items-center md:text-justify h-screen overflow-hidden">
    <div class="hidden md:block md:w-1/2 w-full">
      <img class="w-auto rounded" src="../../assets/login-image.webp" alt="Hero image">
    </div>
    <div class="grid gap-8 justify-center p-8 md:w-1/2">
      <form @submit.prevent="login" class="grid gap-8">
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
        </div>
      </form>
      <p>Access the app with a credential
        <span><button @click="showCredentials" class=" text-secondary font-bold underline">here</button></span>
      </p>
    </div>
  </div>
  <Dialog v-model:visible="credentialsDialog" modal header="Credentials"
          :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <div v-if="credentials">
      <DataTable :value="credentials"
                 paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
        <Column field="username" header="Username"></Column>
        <Column field="password" header="Password"></Column>
        <Column field="first_name" header="Name"></Column>
        <Column header="Autocomplete">
          <template #body="slotProps">
            <Button @click="autoComplete(slotProps.data.username, slotProps.data.password)"
                    icon="pi pi-angle-right" severity="info" rounded />
          </template>
        </Column>
      </DataTable>
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </Dialog>
</template>

<style scoped>

</style>