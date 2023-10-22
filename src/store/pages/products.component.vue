<script>
import Papa from 'papaparse';
import ProductCard from "../components/product-card.component.vue";
import {CsvReadingService} from "../../shared/service/csv-reading.service.js";
import LoadingSpinner from "../../shared/components/LoadingSpinner.component.vue";

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
      csvReader: new CsvReadingService()
    };
  },
  created() {
    this.csvReader.readCsvFile('src/shared/data/GRAPHY_PRODUCTS.csv').then((data) => {
      this.products = this.shuffleArray(data);
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
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.products.slice(startIndex, endIndex);
    },
  },
};
</script>

<template>
  <div class="container mx-auto">
    <div v-if="products">
      <div class="flex flex-col items-center gap-8 py-8">
        <div class="flex flex-wrap justify-center -mx-4 gap-10">
          <ProductCard v-for="product in calculateCurrentPageItems()" :product="product" :key="product.id" />
        </div>
        <div class="flex gap-4">
          <Button @click="currentPage -= 1" :disabled="currentPage === 1" icon="pi pi-angle-left" outlined severity="info" />
          <Button @click="currentPage += 1" :disabled="currentPage === Math.ceil(products.length / itemsPerPage)" icon="pi pi-angle-right" outlined severity="info" />
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