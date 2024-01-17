<template>
  <div class="app-main-layout">
    <!-- Навигационная панель -->
    <nav-bar @open="toggleSidebar" />

    <!-- Боковая панель -->
    <side-bar v-model="isOpen" />

    <!-- Основное содержимое -->
    <main class="app-content full">
      <div class="app-page">
        <!-- Просмотр маршрута -->
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import NavBar from "@/components/app/NavBar.vue";
import SideBar from "@/components/app/SideBar.vue";

export default {
  name: "MainLayout",
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {
    this.initializeData();
  },
  components: { SideBar, NavBar },
  methods: {
    // Получение информации о пользователе после монтирования компонента
    async initializeData() {
      await this.$store.dispatch("info/fetchInfo");
      await this.$store.dispatch("recipes/fetchRecipes");
      console.log("MainLayout после -> initializeData();");
    },
    // Переключение боковой панели
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style>
/*Cвои стили */
/* .app-main-layout {} */
</style>
