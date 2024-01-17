<template>
  <!-- Список рецептов -->
  <div>
    <h2>Recipe List</h2>
    <!-- Проверка наличия рецептов -->
    <div v-if="recipes.length === 0">No recipes available.</div>
    <div v-else>
      <!-- Перебор всех рецептов и передача их в компонент RecipeItem -->
      <RecipeItem
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        @click="selectRecipe(recipe)"
      />
    </div>
  </div>
</template>

<script>
// Импорт необходимых функций из Vuex
// import { mapGetters, mapActions } from "vuex";
// Импорт компонента RecipeItem
import RecipeItem from "@/components/RecipeItem.vue";

// Экспорт компонента RecipeList
export default {
  components: {
    RecipeItem,
  },
  props: {
    recipes: Array, // Принимаем список рецептов через props
  },
  data() {
    return {
      selectedRecipe: null, // Новый стейт для хранения выбранного рецепта
    };
  },
  methods: {
    selectRecipe(recipe) {
      this.selectedRecipe = recipe; // Устанавливаем выбранный рецепт
      this.$router.push({
        name: "recipeDetails",
        params: { recipeId: recipe.id },
      });
    },
  },
};
</script>
<!-- // Использование mapGetters для получения списка рецептов из хранилища
  // computed: {
  //   ...mapGetters("recipes", ["recipes"]),
  // },
  // Использование mapActions для вызова действия fetchRecipes из хранилища
  // methods: {
  //   ...mapActions("recipes", ["fetchRecipes"]),
  // },
  // Вызов действия fetchRecipes при создании компонента
  // created() {
  //   this.fetchRecipes();
  // }, -->
