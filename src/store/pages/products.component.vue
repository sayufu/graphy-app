<script>
import Papa from 'papaparse';
import ProductComponent from "../components/product.component.vue";

export default {
  name: 'ProductsComponent',
  components: {
    ProductComponent,
  },
  data() {
    return {
      products: []
    };
  },
  created() {
    this.loadCSVData();
  },
  methods: {
    loadCSVData() {
      // Adjust the path to your CSV file
      const csvFilePath = 'src/script/data/GRAPHY_PRODUCTS.csv';

      Papa.parse(csvFilePath, {
        download: true, // Set to true for local file paths
        header: true,
        dynamicTyping: true, // Convert numeric data to numbers
        skipEmptyLines: true,
        complete: (result) => {
          this.products = result.data;
        },
        error: (error) => {
          console.error('CSV parsing error:', error);
        },
      });
    },
  },
};
</script>

<template>
  <div>
    <product-component v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<style scoped>
</style>