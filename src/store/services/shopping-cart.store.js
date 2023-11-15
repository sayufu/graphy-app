import { defineStore } from 'pinia';

const CART_STORAGE_KEY = 'userShoppingCart';

export const userShoppingCartStore = defineStore('shopping-cart', {
    state: () => ({
        productIds: [],
    }),
    actions: {
        getProductIds() {
            this.loadCartState();
            return [...this.productIds];
        },
        addProduct(productId) {
            this.productIds = [...this.productIds, productId];
            this.saveCartState();
        },
        deleteProduct(productId) {
            let previousList = this.productIds;
            let newList = previousList.filter(id => id !== productId);
            this.productIds = newList;
            this.saveCartState();
        },
        clearCart() {
            this.productIds = [];
            this.saveCartState();
        },
        saveCartState() {
            const currentProductIds = this.productIds;

            if (JSON.stringify(currentProductIds) !== localStorage.getItem(CART_STORAGE_KEY)) {
                localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(currentProductIds));
            }
        },
        loadCartState() {
            const storedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (storedCart) {
              const parsedCart = JSON.parse(storedCart);
              if (JSON.stringify(parsedCart) !== JSON.stringify(this.productIds)) {
                this.productIds = parsedCart;
              }
            }
        },
    },
});
