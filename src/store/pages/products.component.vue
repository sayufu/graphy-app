<script>
import { HttpsService } from "../../shared/services/https.service.js";
import ProductCard from "../components/product-card.component.vue";
import LoadingSpinner from "../../shared/components/loading-spinner.component.vue";

export default {
  name: 'ProductsComponent',
  components: {
    ProductCard, LoadingSpinner
  },
  data() {
    return {
      products: [],
      currentPage: 1,
      itemsPerPage: 12,
      httpService: new HttpsService(),
      searchTerm: ''
    };
  },
  created() {
    this.httpService.getAll('products').then((response) => {
      this.products = this.shuffleArray(response.data);
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
    calculateCurrentPageItems() {
      const filteredProducts = this.filteredProducts();
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filteredProducts.slice(startIndex, endIndex);
    },
    filteredProducts() {
      const searchTerm = this.searchTerm.toLowerCase().trim();

      return this.products.filter(product => {
        const productName = (product.product || '').toLowerCase();
        return productName.includes(searchTerm);
      });
    },
    handleSearch() {
      this.currentPage = 1; // Reset to the first page when searching
    }
  },
};
</script>

<template>
  <div class="container mx-auto">
    <div v-if="products.length > 0">
      <div class="w-full my-4 px-8" >
        <InputText v-model="searchTerm" @input="handleSearch" placeholder="Search for products" class="w-full" />
      </div>
      <div class="flex flex-col items-center gap-8 py-8">
        <div class="flex flex-wrap justify-center -mx-4 gap-10">
          <ProductCard
              v-for="product in calculateCurrentPageItems(filteredProducts())"
              :product="product"
              :key="product.id"
          />
        </div>
        <div class="flex gap-4">
          <Button @click="currentPage -= 1" :disabled="currentPage === 1" icon="pi pi-angle-left" class="p-button-info p-button-outlined" />
          <Button @click="currentPage += 1" :disabled="currentPage === Math.ceil(filteredProducts().length / itemsPerPage)" icon="pi pi-angle-right" class="p-button-info p-button-outlined" />
        </div>
      </div>
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </div>
</template>