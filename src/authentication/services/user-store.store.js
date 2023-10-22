import { defineStore } from 'pinia';

export const useUserStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null,
    }),
    actions: {
        setUser(user) {
            this.isAuthenticated = true;
            this.user = user;
        },
        logout() {
            localStorage.removeItem("user");
            this.isAuthenticated = false;
            this.user = null;
        },
    }
});