<script>
export default {
  name: 'LoginComponent',
  components: {}
};
</script>

<template>
  <div class="grid md:flex items-center text-center md:text-justify h-screen overflow-hidden">
    <div class="flex hidden sm:block md:w-1/2 w-full">
      <img class="w-auto rounded" src="src/assets/login-image.jpg" alt="Hero image">
    </div>
    <div class="grid gap-8 justify-center p-8 md:w-1/2">
      <h1 class="text-6xl font-black">Welcome</h1>
      <div class="grid gap-2 md:w-[600px]">
        <div class="flex flex-col gap-1">
          <label for="username">Username</label>
          <InputText id="username" v-model="username" aria-describedby="username-help"  placeholder="Enter your email"/>
        </div>
        <div class="flex flex-col gap-1">
          <label for="username">Password</label>
          <InputText id="password" v-model="password" aria-describedby="username-help" placeholder="Enter your password"/>
        </div>
      </div>
      <div class="grid gap-2">
        <router-link to="/"><button class="btn-fill py-4">Sign in</button></router-link>
        <p>Check some credentials to try out the application here</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>