<script>
import LoadingSpinner from "../../shared/components/loading-spinner.component.vue";
import {FileManagerService} from "../../shared/services/file-manager.service.js";

export default {
  name: 'PurchasesComponent',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      purchases: null,
      fileManager: new FileManagerService()
    };
  },
  created() {
    this.fileManager.readCsvFile('GRAPHY_PURCHASES.csv').then((data) => {
      this.purchases = data;
    });
  },
  methods: {
    getProductName(id) {
      return this.products.find(product => product.id === id).name;
    },
    getUserName(id){
      return this.users.find(user => user.id === id).first_name + " " + this.users.find(user => user.id === id).last_name;
    },
  },
}
</script>

<template>
  <div class="container mx-auto">
    <Button class="my-4"
            icon="pi pi-arrow-left" rounded aria-label="Back" severity="info"
            @click="$router.go(-1)"/>
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