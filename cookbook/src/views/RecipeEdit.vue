<template>
  <div>
    <div class="row">
      <!-- Левая часть с текущим рецептом -->
      <div class="raw s12 m6 l4">
        <RecipeItem :recipe="recipe" />
      </div>

      <div class="col s12 m6 l8">
        <div class="card orange darken-3 bill-card">
          <div class="card-content white-text">
            <div class="card-header">
              <span class="card-title">Редактирование рецепта</span>
            </div>
            <!--  -->
            <form @submit.prevent="submitHandler">
              <div class="input-field">
                <input type="text" id="name" v-model="recipe.name" required />
                <label class="active" for="name">Название рецепта</label>
              </div>
              <!--  -->
              <div class="input-field">
                <input type="url" id="image" v-model="recipe.image" required />
                <label class="active" for="image">URL изображения</label>
              </div>
              <!--  -->
              <div class="row">
                <div
                  class="row"
                  v-for="(ingredient, index) in recipe.ingredients"
                  :key="index"
                >
                  <div class="input-field col l4 m12 s12">
                    <input
                      type="text"
                      :id="'ingredientName' + index"
                      v-model="ingredient.name"
                      required
                    />
                    <label class="active" :for="'ingredientName' + index"
                      ><a
                        class="waves-effect waves-light align-left"
                        @click="removeIngredient(index)"
                      >
                        <i class="material-icons">delete</i> </a
                      >Ингредиент {{ index + 1 }}</label
                    >
                  </div>
                  <div class="input-field col l4 m6 s6">
                    <input
                      type="number"
                      :id="'ingredientQuantity' + index"
                      v-model="ingredient.quantity"
                      required
                    />
                    <label class="active" :for="'ingredientQuantity' + index"
                      >Количество</label
                    >
                  </div>
                  <div class="input-field col l4 m6 s6">
                    <label
                      class="active"
                      :for="'ingredientUnit' + index"
                    ></label>
                    <select
                      :id="'ingredientUnit' + index"
                      v-model="ingredient.unit"
                      required
                      class="browser-default"
                    >
                      <option value="pcs">1 Штука</option>
                      <option value="kg">1 Килограмм</option>
                      <option value="g">1 Грамм</option>
                      <option value="ml">1 Миллилитр</option>
                      <option value="l">1 Литр</option>
                      <option value="tsp">1 чайная ложка (5 мл)</option>
                      <option value="tbsp">1 столовая ложка (15 мл)</option>
                      <option value="cup">1 чашка (237 мл)</option>
                    </select>
                  </div>
                </div>
                <button
                  class="btn waves-effect waves-light"
                  @click="addIngredient"
                >
                  Добавить
                </button>
              </div>
              <!--  -->
              <div class="row">
                <div
                  class="input-field s12 m12 l12"
                  v-for="(step, index) in recipe.steps"
                  :key="index"
                >
                  <input
                    type="text"
                    :id="'step' + index"
                    v-model="step.description"
                    required
                  />
                  <label class="active" :for="'step' + index">
                    <a
                      class="waves-effect waves-light align-left"
                      @click="removeStep(index)"
                    >
                      <i class="material-icons">delete</i>
                    </a>
                    Шаг {{ index + 1 }}</label
                  >
                </div>
                <button class="btn waves-effect waves-light" @click="addStep">
                  Добавить
                </button>
                <div></div>
              </div>
            </form>
            <div class="row">
              <hr />
              <button
                class="btn waves-effect waves-light"
                @click="submitHandler"
                type="submit"
              >
                Сохранить
              </button>
              <button
                class="btn waves-effect waves-light"
                @click="deleteRecipe"
                type="submit"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeItem from "@/components/RecipeItem.vue";

export default {
  components: {
    RecipeItem,
  },
  computed: {
    recipe() {
      // recipeId для поиска рецепта в хранилище
      return this.$store.state.recipes.recipes.find(
        (recipe) => recipe.id === this.$route.params.recipeId
      );
    },
  },
  methods: {
    showToast(message) {
      // Всплывающее уведомление
      // eslint-disable-next-line
      M.toast({ html: message });
    },
    async submitHandler() {
      try {
        // Вызов действия для редактирования рецепта
        await this.$store.dispatch("recipes/editRecipe", this.recipe);
        this.showToast("Рецепт успешно отредактирован!");
        this.$router.go(-1);
      } catch (error) {
        console.error(error);
        this.showToast("Произошла ошибка при редактировании рецепта");
      }
    },
    async deleteRecipe() {
      try {
        // Получите идентификатор рецепта
        const recipeId = this.$route.params.recipeId;

        // Вызов deleteRecipe из хранилища recipes
        this.$store.dispatch("recipes/deleteRecipe", recipeId);

        // Всплывающее уведомление об успешном удалении рецепта
        this.showToast("Рецепт успешно удален!");

        // После успешного удаления
        this.$router.push("/");
      } catch (error) {
        // Обработка ошибок
        console.error(error);
        this.showToast("Произошла ошибка при удалении рецепта");
      }
    },

    // Добавление нового ингредиента
    addIngredient() {
      this.recipe.ingredients.push({ name: "", quantity: "", unit: "" });
    },
    // Удаление ингредиента по индексу
    removeIngredient(index) {
      if (this.recipe.ingredients.length > 1) {
        this.recipe.ingredients.splice(index, 1);
      }
    },
    // Добавление нового шага приготовлени
    addStep() {
      this.recipe.steps.push({ description: "" });
    },
    // Удаление шага приготовления по индексу
    removeStep(index) {
      if (this.recipe.steps.length > 1) {
        this.recipe.steps.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
/* Ваши стили из блока с курсом валют */
.bill-card {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  overflow: hidden;
  color: white;
  height: 100%;
}

.bill-card .card-content {
  padding: 1rem;
}

.bill-card .card-title {
  margin: 0;
  font-size: 1.5rem;
}

.bill-card form {
  padding: 20px;
  background-color: white; /* Изменено на голубой цвет */
}

.input-field {
  margin-bottom: 15px;
}

.input-field input:focus {
  border-bottom: 1px solid #4caf50;
  box-shadow: 0 1px 0 0 #4caf50;
}
</style>
