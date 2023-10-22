<script>
import {CsvReadingService} from "../../shared/service/csv-reading.service.js";
import ProductCard from "../components/product-card.component.vue";
import LoadingSpinner from "../../shared/components/LoadingSpinner.component.vue";

export default {
  name: 'ProductDetails',
  components: {ProductCard, LoadingSpinner},
  data() {
    return {
      products: [],
      csvReader: new CsvReadingService(),
      product: null
    };
  },
  created() {
    this.csvReader.readCsvFile('../src/shared/data/GRAPHY_PRODUCTS.csv').then((data) => {
      this.products = this.shuffleArray(data);
      const productId = parseInt(this.$route.params.id);
      this.product = this.products.find(product => product.id === productId);
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
  },
};
</script>

<template>
  <div class="container mx-auto">
    <div v-if="product">
      <div class="grid gap-20">
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
                    :loading="loading" @click="load" />
          </div>
        </div>
        <div>
          <h1 class="text-2xl font-bold">Recommended products</h1>
        </div>
        <div>
          <h1 class="text-2xl font-bold">Recommended by {{ product.brand }}</h1>
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