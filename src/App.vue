<script>
</script>

<template>
  <nav class="sticky container mx-auto px-2 py-4">
    <div class="flex place-content-between">
      <img src="./assets/graphy-logo.png" alt="Graphy logo" class="h-8 md:h-12 hover:scale-95 duration-200" />
      <div class="hidden md:flex gap-6 items-center">
        <a id="about-link"><button class="btn-fill">Sign in</button></a>
      </div>
    </div>
  </nav>
  <main class="container mx-auto px-2 py-4">
    <router-view />
  </main>
</template>

<style scoped>

</style>
