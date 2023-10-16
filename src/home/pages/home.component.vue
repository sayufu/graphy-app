<script>
export default {
  name: 'HomeComponent',
  components: {}
};
</script>

<template>
  <div class="grid md:flex gap-8 md:gap-24 items-center text-center md:text-justify py-6 md:py-12">
    <div class="flex flex-col gap-8">
      <h2 class="text-primary text-7xl md:text-8xl font-bold">Hi there!</h2>
      <p class="text-xl md:text-2xl">This is a university final project for a Algorithmic Complexity course. We have recreated the product’s recommendations section usually found in real e-commerces using graphs theory and chose them depending on their category similarities. Choose a product from a category to see it for yourself.</p>
      <div class="flex gap-4 justify-center items-center md:items-baseline md:justify-start">
        <a id="github-link" href="https://github.com/sayufu/graphy-app" target="_blank"><button class="btn-fill">Github Repo</button></a>
        <a id="sign-in-link"><button class="btn-outline">Sign in</button></a>
      </div>
    </div>
    <div class="flex md:place-content-end md:pt-6">
      <img class="w-full h-auto rounded" src="src/assets/hero-image.jpg" alt="Hero image">
    </div>
  </div>
</template>

<style>

</style>