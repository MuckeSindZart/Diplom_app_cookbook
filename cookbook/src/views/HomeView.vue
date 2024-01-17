<template>
  <div class="container">
    <!-- Заголовок страницы -->
    <div class="page-title">
      <h3>Кулинарная книга рецептов</h3>
      <!-- Кнопка обновления -->
      <button
        class="btn waves-effect waves-light btn-small"
        @click="refreshRecipes"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <!-- Список рецептов -->
    <div class="row">
      <!-- Используем компонент RecipeList для отображения списка рецептов -->
      <RecipeList :recipes="recipes" />
    </div>

    <!-- Плавающая кнопка действия -->
    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/recipecreate">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RecipeList from "@/components/RecipeList.vue";

export default {
  components: {
    RecipeList,
  },
  computed: {
    // Используем mapGetters для получения выбранного рецепта из хранилища
    ...mapGetters("recipes", ["selectedRecipe", "recipes"]),
  },
  methods: {
    // Добавляем метод обновления списка рецептов
    refreshRecipes() {
      this.$store.dispatch("recipes/fetchRecipes");
    },
  },
};
</script>
