import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

export default {
  namespaced: true,
  actions: {
    // Асинхронный метод для входа в систему
    async login({ commit }, payload) {
      try {
        const auth = getAuth();
        // Используем встроенный метод для входа в систему
        await signInWithEmailAndPassword(auth, payload.email, payload.password);
      } catch (error) {
        // В случае ошибки передаем ошибку в мутацию setError и бросаем ее
        commit("setError", error, { root: true });
        throw error;
      }
    },

    // Асинхронный метод для регистрации нового пользователя
    async register({ commit }, payload) {
      try {
        const auth = getAuth();
        // Создаем нового пользователя с помощью встроенного метода
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );
        // Получаем UID нового пользователя
        const uid = userCredential.user.uid;
        const db = getDatabase();
        const userRef = ref(db, `users/${uid}/info`);
        // Создаем объект с данными пользователя
        const userData = {
          name: payload.name,
          email: payload.email,
          uid,
        };
        // Сохраняем данные пользователя в базе данных
        await set(userRef, userData);
      } catch (error) {
        // В случае ошибки передаем ошибку в мутацию setError и бросаем ее
        commit("setError", error, { root: true });
        throw error;
      }
    },

    // Асинхронный метод для получения UID текущего пользователя
    async getUid() {
      const auth = getAuth();
      const user = auth.currentUser;
      // Возвращаем UID пользователя, если он аутентифицирован, в противном случае возвращаем null
      return user ? user.uid : null;
    },
    // Асинхронный метод для выхода из системы
    async logout({ commit }) {
      try {
        const auth = getAuth();
        // Используем встроенный метод для выхода из системы
        await auth.signOut();
      } catch (error) {
        // В случае ошибки передаем ошибку в мутацию setError и бросаем ее
        commit("setError", error, { root: true });
        throw error;
      }
    },
  },
};
