<template>
  <div class="recipe-details">
    <div class="recipe-info">
      <h2>{{ recipe.name }}</h2>
      <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
    </div>

    <div class="recipe-content">
      <div class="ingredients">
        <h3>Ингредиенты:</h3>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">
            {{ ingredient.name }}, {{ ingredient.quantity }} ,
            {{ ingredient.unit }}
          </li>
        </ul>
      </div>

      <div class="steps">
        <h3>Шаги приготовления:</h3>
        <ol>
          <li v-for="step in recipe.steps" :key="step">
            {{ step.description }}
          </li>
        </ol>
      </div>
    </div>
    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        :to="`/recipeedit=${recipe.id}`"
      >
        <i class="large material-icons">edit</i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeDetails",
  computed: {
    recipe() {
      // recipeId для поиска рецепта в хранилище
      return this.$store.state.recipes.recipes.find(
        (recipe) => recipe.id === this.$route.params.recipeId
      );
    },
  },
};
</script>

<style scoped>
.recipe-details {
  max-width: 800px;
  margin: 0 auto;
}

.recipe-info {
  text-align: center;
}

.recipe-image {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

.recipe-content {
  margin-top: 20px;
}

.ingredients,
.steps {
  margin-bottom: 20px;
}

.ingredients h3,
.steps h3 {
  margin-bottom: 10px;
}
</style>
