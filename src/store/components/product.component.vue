<script>
export default {
  name: 'ProductComponent',
  components: {},
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<template>
  <div>
    {{ product.product }}
    {{ product.category }}
  </div>
</template>

<style scoped>

</style>