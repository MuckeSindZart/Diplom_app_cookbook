import { createStore } from "vuex";
import auth from "./auth";
import info from "./info";
import recipes from "./recipes";

// Создаем хранилище Vuex
const store = createStore({
  state: {
    error: null,
  },
  mutations: {
    // Мутация для установки ошибки
    setError(state, error) {
      state.error = error;
    },
    // Мутация для очистки ошибки
    clearError(state) {
      state.error = null;
    },
  },
  getters: {
    // Геттер для получения текущей ошибки
    error: (state) => state.error,
  },
  modules: {
    // Подключаем модули auth, info, recipes
    auth,
    info,
    recipes,
  },
});

export default store;
