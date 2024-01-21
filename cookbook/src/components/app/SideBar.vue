<template>
  <ul class="sidenav app-sidenav" :class="{ open: modelValue }">
    <!-- Используем router-link для навигации по ссылкам -->
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      active-class="active"
    >
      <li>
        <!-- Ссылка в боковой панели с названием ссылки -->
        <a class="waves-effect waves-orange pointer">{{ link.title }}</a>
      </li>
    </router-link>
  </ul>
</template>

<script>
export default {
  // Принимаем значение модели в качестве prop
  props: {
    modelValue: Boolean,
  },
  // Инициализируем данные компонента
  data: () => ({
    // Список ссылок для боковой панели
    links: [
      { title: "Home", url: "/" },
      { title: "Create Recipe", url: "/recipecreate" },
      { title: "Profile", url: "/profile" },
    ],
  }),
};
</script>
