import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(userData) {
      this.user = userData.user;
      this.token = userData.token;

      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("token", this.token);
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    loadFromStorage() {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");
      if (storedUser && storedToken) {
        this.user = JSON.parse(storedUser);
        this.token = storedToken;
      }
    },
  },
});
