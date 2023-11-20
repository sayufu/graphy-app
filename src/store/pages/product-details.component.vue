<script>
import ProductCard from "../components/product-card.component.vue";
import LoadingSpinner from "../../shared/components/loading-spinner.component.vue";
import {RecommendationsService} from "../../shared/services/recommendations.service.js";
import {HttpsService} from "../../shared/services/https.service.js";
import {userShoppingCartStore} from "../services/shopping-cart.store.js";
import {useToast} from "primevue/usetoast";
import Toast from "primevue/toast";

export default {
  name: 'ProductDetails',
  components: {ProductCard, LoadingSpinner, Toast },
  data() {
    return {
      httpService: new HttpsService(),
      recommendationsService: new RecommendationsService(),
      products: [],
      product: null,
      recommendationsByProduct: null,
      recommendationsByBrand: null,
      currentPageByProducts: 1,
      currentPageByBrand: 1,
      itemsPerPage: 4,
    };
  },
  created() {
    this.httpService.getAll('products').then((response) => {
      this.products = this.shuffleArray(response.data);
      const productId = parseInt(this.$route.params.id);
      this.product = this.products.find(product => product.id === productId);

      this.recommendationsService.getRecommendationsData(this.$route.params.id).then((response) => {
        // Recommended products by product
        const recommendedProductIds = response.data['productRecommendations'];
        this.recommendationsByProduct = this.products.filter(product => recommendedProductIds.includes(product.id));

        // Recommended products by brand
        const recommendedBrandIds = response.data['brandRecommendations'];
        this.recommendationsByBrand = this.products.filter(product => recommendedBrandIds.includes(product.id));
      });
    });
  },
  methods: {
    shuffleArray(products) {
      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
      }
      return products;
    },
    reloadPage() {
      window.location.reload();
    },
    calculateCurrentPageItems(items, currentPage) {
      const startIndex = (currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      console.log(startIndex, endIndex)
      return items.slice(startIndex, endIndex);
    },
    addProductToCart(productId) {
      const cartStore = userShoppingCartStore();
      const storedProducts = cartStore.getProductIds()
      cartStore.addProduct(productId)

      this.$toast.add({
        severity: 'success',
        summary: 'Added a product to cart',
        detail: `${this.product.product} has been added`,
        group: 'bl',
        life: 2000
      });
    },
  },
};
</script>

<template>
  <div class="container mx-auto">
    <Toast />
    <div class="flex gap-4 items-center">
      <Button class="my-4"
              icon="pi pi-arrow-left" rounded aria-label="Back" severity="info"
              @click="$router.go(-1)"/>
      <p class="text-2xl font-medium">Go back</p>
    </div>
    <div v-if="product">
      <div class="grid gap-12 py-8">
        <div class="flex flex-wrap gap-2 md:gap-6 px-4">
          <Tag icon="pi pi-tag" severity="info">{{product.category}}</Tag>
          <Tag icon="pi pi-tag" severity="info">{{product.sub_category}}</Tag>
          <Tag icon="pi pi-tag" severity="info">{{product.type}}</Tag>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="flex items-center justify-center h-full">
            <img class="object-cover" :src="product.image_url" :alt="product.product">
          </div>
          <div class="grid border px-8 py-20 gap-6">
            <p class="underline text-gray-500 text-lg">{{product.brand}}</p>
            <h1 class="text-2xl md:text-4xl text-secondary font-bold">{{product.product}}</h1>
            <p class="font-bold text-3xl">${{product.price}}</p>
            <Button outlined icon="pi pi-shopping-cart"
                    class="w-full"
                    severity="info"
                    type="button" label="Add to cart"
                    @click="addProductToCart(product.id)" />
          </div>
        </div>

        <div class="grid gap-2 px-2 py-2">
          <h1 class="text-2xl font-bold text-primary">Details</h1>
          <p class="text-justify">{{product.description}}</p>
        </div>

        <div class="grid gap-2 px-2 py-2">
          <h1 class="text-2xl font-bold text-primary">Recommended products</h1>
          <div v-if="this.recommendationsByProduct === null">
            <div class="flex items-center justify-center">
              <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="2" fill="var(--surface-ground)"
                               animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </div>
          </div>
          <div v-else-if="this.recommendationsByProduct.length === 0">
            <p>No products to show</p>
          </div>
          <div v-else>
            <div class="grid gap-4">
              <div class="flex flex-wrap gap-8">
                <ProductCard v-for="product in calculateCurrentPageItems(this.recommendationsByProduct, this.currentPageByProducts)"
                             :key="product.id"
                             :product="product" />
              </div>
              <div class="flex gap-4 justify-center">
                <Button @click="currentPageByProducts -= 1" :disabled="currentPageByProducts === 1" icon="pi pi-angle-left" outlined severity="info" />
                <Button @click="currentPageByProducts += 1" :disabled="currentPageByProducts === Math.ceil(this.recommendationsByProduct.length / itemsPerPage)" icon="pi pi-angle-right" outlined severity="info" />
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-2 px-2 py-2">
          <h1 class="text-2xl font-bold text-primary">Recommended by {{ product.brand }}</h1>
          <div v-if="this.recommendationsByBrand === null">
            <div class="flex items-center justify-center">
              <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="2" fill="var(--surface-ground)"
                               animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </div>
          </div>
          <div v-else-if="this.recommendationsByBrand.length === 0">
            <p>No products to show</p>
          </div>
          <div v-else>
            <div class="grid gap-4">
              <div class="flex flex-wrap gap-8">
                <ProductCard v-for="product in calculateCurrentPageItems(this.recommendationsByBrand, this.currentPageByBrand)"
                             :key="product.id"
                             :product="product" />
              </div>
              <div class="flex gap-4 justify-center">
                <Button @click="currentPageByBrand -= 1" :disabled="currentPageByBrand === 1" icon="pi pi-angle-left" outlined severity="info" />
                <Button @click="currentPageByBrand += 1" :disabled="currentPageByBrand === Math.ceil(this.recommendationsByBrand.length / itemsPerPage)" icon="pi pi-angle-right" outlined severity="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </div>
</template>

<style scoped>

</style>