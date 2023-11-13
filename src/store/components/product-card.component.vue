<script>
import {userShoppingCartStore} from "../services/shopping-cart.store.js";
import {useToast} from "primevue/usetoast";

export default {
  name: 'ProductCard',
  components: {},
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addProductToCart(productId) {
      const cartStore = userShoppingCartStore();
      const storedProducts = cartStore.getProductIds()
      cartStore.addProduct(productId)

      this.$toast.add({
        severity: 'success',
        summary: 'Added a product to cart',
        detail: `${this.product.product} has been added`,
        icon: 'pi pi-cart-plus',
        group: 'bl',
        life: 2000
      });
    }
  }
};
</script>

<template>
  <Toast />
  <div class="flex flex-col gap-8 justify-between px-6 py-10 border rounded h-[500px] w-[340px]">
    <router-link
        :to="'/products/' + product.id"
        class="flex flex-col justify-between h-full">
      <div class="flex items-center gap-2">
        <i class="pi pi-tag text-gray-500 text-lg"></i>
        <p class="text-gray-500 text-sm">{{product.category}}</p>
      </div>
      <div class="flex flex-col items-center">
        <img class="w-32 h-32 object-cover" :src="product.image_url" :alt="product.product">
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between items-center gap-6">
          <div class="flex flex-col gap-1">
            <h1 class="font-bold">{{product.product}}</h1>
          </div>
          <p class="font-black text-xl text-secondary">${{product.price}}</p>
        </div>
        <h1 class="text-sm">{{product.brand}}</h1>
      </div>
    </router-link >
    <Button outlined icon="pi pi-shopping-cart"
            class="w-full"
            severity="info"
            type="button" label="Add to cart"
            @click="addProductToCart(product.id)" />
  </div>
</template>

<style scoped>

</style>