<script>
</script>

<template>
  <nav class="sticky container mx-auto px-2 py-4">
    <div class="flex place-content-between">
      <router-link to="/"><img src="./assets/graphy-logo.png" alt="Graphy logo" class="h-8 md:h-12 hover:scale-95 duration-200" /></router-link>
      <div class="hidden md:flex gap-6 items-center">

      </div>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style scoped>

</style>
