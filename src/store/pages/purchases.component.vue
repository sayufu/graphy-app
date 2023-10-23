<script>
import LoadingSpinner from "../../shared/components/LoadingSpinner.component.vue";
import {CsvReadingService} from "../../shared/services/csv-reading.service.js";

export default {
  name: 'PurchasesComponent',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      purchases: null,
      products: null,
      users:null,
      csvReader: new CsvReadingService()
    };
  },
  created() {
    this.csvReader.readCsvFile('../src/shared/data/GRAPHY_PURCHASES.csv').then((data) => {
      this.purchases = data;
    });
    this.csvReader.readCsvFile('../src/shared/data/GRAPHY_PRODUCTS.csv').then((data) => {
      this.products = data;
    });
    this.csvReader.readCsvFile('../src/shared/data/USER_DATA.csv').then((data) => {
      this.users = data;
    });
  },
  methods: {
    getProductName(id) {
      return this.products.find(product => product.id === id).name;
    },
    getUserName(id){
      console.log("A");
      return this.users.find(user => user.id === id).first_name + " " + this.users.find(user => user.id === id).last_name;
    }
  },
}
</script>

<template>
  <div class="container mx-auto">
    <div v-if="purchases">
      <DataTable :value="this.purchases"
                 paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50]"
                 tableStyle="min-width: 50rem">
        <Column field="ID" header="ID"></Column>
        <Column field="id_client" header="Client ID"></Column>
        <Column field="list_products" header="Products"></Column>
      </DataTable>
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </div>
</template>

<style scoped>

</style>