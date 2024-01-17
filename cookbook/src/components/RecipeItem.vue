<template>
  <!-- Одна карточка рецепта -->
  <div class="col s12 m6 l4">
    <!-- Карточка с изображением рецепта и названием -->
    <div class="blue card recipe-card">
      <div class="card-image">
        <!-- Изображение рецепта -->
        <img :src="recipe.image" alt="Recipe Image" class="recipe-image" />
      </div>
      <!-- Название рецепта -->
      <span class="card-title white-text">{{ recipe.name || "Название" }}</span>

      <div class="card-content white-text">
        <!-- Дополнительная информация о рецепте, если необходимо -->
      </div>
    </div>
  </div>
</template>

<script>
// Экспортируем компонент RecipeItem
export default {
  // Принимаем объект рецепта в качестве prop
  props: {
    recipe: Object,
  },
};
</script>

<style scoped>
/* Стили для компонента RecipeItem */
.recipe-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px; /* Отступы слева, справа и сверху */
  overflow: hidden; /* Фиксируем размер карточки и скрываем излишки */
}

.recipe-card .card-image {
  height: 200px; /* Фиксированная высота для изображения */
}

.recipe-card .card-content {
  padding: 1rem;
}

.recipe-card .card-title {
  margin: 0;
  font-size: 1.5rem;
}

.recipe-card .recipe-image {
  height: 100%;
  width: 100%; /* Заполняет 100% ширины родительской карточки */
  object-fit: cover;
}
</style>
