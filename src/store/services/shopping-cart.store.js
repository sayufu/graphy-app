import { defineStore } from 'pinia';

const CART_STORAGE_KEY = 'userShoppingCart';

export const userShoppingCartStore = defineStore('shopping-cart', {
    state: () => ({
        productIds: [],
    }),
    actions: {
        getProductIds() {
            this.loadCartState();
            return this.productIds;
        },
        addProduct(productId) {
            this.productIds.push(productId);
            this.saveCartState();
        },
        deleteProduct(productId) {
            this.productIds = this.productIds.filter(id => id !== productId);
            this.saveCartState();
        },
        clearCart() {
            this.productIds = [];
            this.saveCartState();
        },
        saveCartState() {
            const currentProductIds = this.productIds;

            if (JSON.stringify(currentProductIds) !== localStorage.getItem(CART_STORAGE_KEY)) {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.productIds));
            }
        },
        loadCartState() {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            this.productIds = storedCart ? JSON.parse(storedCart) : [];
        },
    },
});