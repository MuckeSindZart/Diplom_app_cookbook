import { getDatabase, ref, push, set, get, remove } from "firebase/database";

export default {
  namespaced: true,
  state: {
    recipes: [],
  },
  mutations: {
    // Мутация для установки списка рецептов
    setRecipes(state, recipes) {
      state.recipes = recipes;
    },
    // Мутация для добавления рецепта в список
    addRecipe(state, recipe) {
      state.recipes.push(recipe);
    },
    // Мутация для обновления рецепта в списке
    updateRecipe(state, updatedRecipe) {
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === updatedRecipe.id
      );
      if (index !== -1) {
        // Обновляем рецепт в массиве
        state.recipes.splice(index, 1, updatedRecipe);
      }
    },
    // Мутация для удаления рецепта из списка
    deleteRecipe(state, recipeId) {
      state.recipes = state.recipes.filter((recipe) => recipe.id !== recipeId);
    },
  },
  actions: {
    // Асинхронный метод для добавления рецепта
    async addRecipe({ commit, rootState }, recipe) {
      try {
        // Получаем UID текущего пользователя из информации о пользователе
        const uid = rootState.info.info.uid;
        const db = getDatabase();
        const userRecipesRef = ref(db, `users/${uid}/recipes/`);
        // Добавляем новый рецепт в базу данных
        const newRecipeRef = push(userRecipesRef);
        await set(newRecipeRef, recipe);
        // Добавляем рецепт в список в состоянии
        commit("setRecipes", [
          ...rootState.recipes.recipes,
          { ...recipe, id: newRecipeRef.key },
        ]);
      } catch (error) {
        // В случае ошибки передаем ошибку в мутацию setError и бросаем ее
        console.error("Error adding recipe:", error);
        commit("setError", error, { root: true });
        throw error;
      }
    },
    async deleteRecipe({ commit, rootState }, recipeId) {
      try {
        // Получаем UID текущего пользователя из информации о пользователе
        const uid = rootState.info.info.uid;
        const db = getDatabase();

        // Удаление рецепта из базы данных
        const recipeRef = ref(db, `users/${uid}/recipes/${recipeId}`);
        await remove(recipeRef);

        // Удаление рецепта из хранилища
        commit("deleteRecipe", recipeId);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    async editRecipe({ commit, rootState }, editedRecipe) {
      try {
        // Получаем UID текущего пользователя из информации о пользователе
        const uid = rootState.info.info.uid;
        const db = getDatabase();
        // Обновление рецепта в базе данных
        const recipeRef = ref(db, `users/${uid}/recipes/${editedRecipe.id}`);
        await set(recipeRef, editedRecipe);

        // Обновление рецепта в хранилище
        commit("updateRecipe", editedRecipe);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    // Асинхронный метод для получения списка рецептов
    async fetchRecipes({ commit, rootState }) {
      try {
        // Получаем UID текущего пользователя из информации о пользователе
        const uid = rootState.info.info.uid;
        const db = getDatabase();
        // Получаем снимок списка рецептов из базы данных
        const recipesSnapshot = await get(ref(db, `users/${uid}/recipes/`));
        const recipes = [];
        // Проходим по снимку и формируем массив рецептов
        recipesSnapshot.forEach((recipeSnapshot) => {
          const recipe = recipeSnapshot.val();
          recipe.id = recipeSnapshot.key;
          recipes.push(recipe);
        });
        // Устанавливаем полученный список рецептов в состояние
        commit("setRecipes", recipes);
      } catch (error) {
        // В случае ошибки передаем ошибку в мутацию setError и бросаем ее
        console.error("Error fetching recipes:", error);
        commit("setError", error, { root: true });
        throw error;
      }
    },

    // Метод для очистки списка рецептов
    async clearRecipes({ commit }) {
      commit("setRecipes", []);
    },
  },
  getters: {
    // Геттер для получения списка рецептов
    recipes: (state) => state.recipes,
  },
};
