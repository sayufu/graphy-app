<script>
import {FileManagerService} from "../../shared/services/file-manager.service.js";
import ProductCard from "../../store/components/product-card.component.vue";
import LoadingSpinner from "../../shared/components/loading-spinner.component.vue";

export default {
  name: 'ProductDetails',
  components: {ProductCard, LoadingSpinner},
  data() {
    return {
      products: [],
      fileManager: new FileManagerService(),
      product: null,

      recommendedProducts: [],
      recommendedByBrand: []
    };
  },
  created() {
    const productId = parseInt(this.$route.params.id);

    // Load products
    this.fileManager.readCsvFile('../src/shared/data/GRAPHY_PRODUCTS.csv').then((data) => {
      this.products = this.shuffleArray(data);
      this.product = this.products.find(product => product.id === productId);
    });

    // Get the recommendations
    // Write the productId to process in python script
    this.fileManager.writeTxtFile(productId, '../src/shared/data/product-id-transfer.txt').then((response) => {
      console.log(response)
    });
    // Await for python script function to finish
    // this.executePythonScript()


    // Get the data from txt
    this.fileManager.readTxtFile('../src/shared/data/products-recommendations.txt').then((data) =>{
      const productRecommendedIds = this.data;
      for (const productId in productRecommendedIds) {
        this.recommendedProducts.append(this.products.find(product => product.id === productId))
      }
    })
    this.fileManager.readTxtFile('../src/shared/data/brand-recommendations.txt').then((data) =>{
      const productRecommendedIds = this.data;
      for (const productId in productRecommendedIds) {
        this.recommendedByBrand.append(this.products.find(product => product.id === productId))
      }
    })
  },
  methods: {
    shuffleArray(products) {
      for (let i = products.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [products[i], products[j]] = [products[j], products[i]];
      }
      return products;
    },

    async executePythonScript() {
      // Execute the Python script.
      const pythonScriptPath = '../src/shared/python_script.py';
      execSync(`python ${pythonScriptPath}`);

      // Wait for the Python script to finish executing.
      const stdout = execSync(`ps aux | grep python ${pythonScriptPath} | grep -v grep | awk '{print $2}'`);
      const pid = parseInt(stdout);
      while (pid > 0) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              execSync(`ps aux | grep python ${pythonScriptPath} | grep -v grep | awk '{print $2}'`);
              resolve();
            } catch (error) {
              reject(error);
            }
          }, 100);
        });
      }

      // Read the `products-recommendation.txt` file.
      const productsRecommendationTxtPath = '../src/shared/data/products-recommendation.txt';
      const productsRecommendationData = await this.$fileManager.readTxtFile(productsRecommendationTxtPath);

      // Update the data in your Vue component.
      this.data = productsRecommendationData;
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
        <div class="grid gap-2 px-2 py-2">
          <h1 class="text-2xl font-bold text-primary">Details</h1>
          <p class="text-justify">{{product.description}}</p>
        </div>
        <div class="grid gap-2 px-2 py-2">
          <h1 class="text-2xl font-bold text-primary">Recommended products</h1>
          <div class="flex flex-wrap gap-4">
            <ProductCard v-for="product in recommendedProducts" :product="product" :key="product.id" />
          </div>
        </div>
        <div class="grid gap-2 px-2 py-2">
          <h1 class="text-2xl font-bold text-primary">Recommended by {{ product.brand }}</h1>
          <div class="flex flex-wrap gap-4">
            <ProductCard v-for="product in recommendedByBrand" :product="product" :key="product.id" />
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