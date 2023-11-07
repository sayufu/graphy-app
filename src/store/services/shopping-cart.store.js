import { defineStore } from 'pinia';

export const userShoppingCartStore = defineStore('shopping-cart', {
    state: () => ({
        productIds: [],
    }),
    actions: {
        addProduct(productId) {
            this.productIds.push(productId);
        },
        deleteProduct(productId) {
            this.productIds = this.productIds.filter(id => id !== productId);
        },
        clearCart() {
            this.productIds = [];
        }
    }
});