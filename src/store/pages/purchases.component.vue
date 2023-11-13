<script>
import LoadingSpinner from "../../shared/components/loading-spinner.component.vue";
import {HttpsService} from "../../shared/services/https.service.js";

export default {
  name: 'PurchasesComponent',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      purchases: null,
      httpService: new HttpsService(),
    };
  },
  created() {
    this.httpService.getAll('purchases').then((response) => {
      this.purchases = (response.data).reverse();
    });
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
        <Column field="_id" header="ID"></Column>
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