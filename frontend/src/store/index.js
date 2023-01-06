import { createStore } from "vuex";

const store = createStore({
  state: {
    user: true,
  },
  mutations: {
    toggleUser(state) {
      state.user = !state.user;
    },
  },
  actions: {},
  getters: {},
});

export default store;
