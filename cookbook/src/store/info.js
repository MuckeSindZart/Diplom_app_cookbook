import { getDatabase, ref, update, get } from "firebase/database";

export default {
  namespaced: true,
  state: {
    info: {
      email: "",
      name: "",
      uid: "",
    },
  },
  mutations: {
    // Мутация для установки информации о пользователе
    setInfo(state, info) {
      state.info = info;
    },
    // Мутация для очистки информации о пользователе
    clearInfo(state) {
      state.info = {}; // Очищаем информацию о пользователе
    },
  },
  actions: {
    // Асинхронный метод для обновления информации о пользователе
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        // Получаем UID текущего пользователя с помощью действия getUid из модуля auth
        const uid = await dispatch("auth/getUid", null, { root: true });
        // Объединяем текущую информацию о пользователе с обновленными данными
        const updateData = { ...getters.info, ...toUpdate };
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}/info`);
        // Обновляем информацию о пользователе в базе данных
        await update(userRef, updateData);
        // Устанавливаем обновленную информацию в состояние
        commit("setInfo", updateData);
      } catch (error) {
        // В случае ошибки передаем ошибку в мутацию setError и бросаем ее
        commit("setError", error, { root: true });
        throw error;
      }
    },

    // Асинхронный метод для получения информации о пользователе
    async fetchInfo({ dispatch, commit }) {
      try {
        // Получаем UID текущего пользователя с помощью действия getUid из модуля auth
        const uid = await dispatch("auth/getUid", null, { root: true });
        const db = getDatabase();
        // Получаем информацию о пользователе из базы данных
        const info = (await get(ref(db, `users/${uid}/info`))).val();
        // Устанавливаем полученную информацию в состояние
        commit("setInfo", info);
      } catch (error) {
        // В случае ошибки передаем ошибку в мутацию setError и бросаем ее
        commit("setError", error, { root: true });
        throw error;
      }
    },
  },
  getters: {
    // Геттер для получения информации о пользователе
    info: (state) => state.info,
    // Геттер для получения UID пользователя
    uid: (state) => state.info.uid,
  },
};
