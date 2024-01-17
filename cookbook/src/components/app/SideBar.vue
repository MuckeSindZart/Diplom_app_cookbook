<!-- <template>
  <ul class="sidenav app-sidenav open">
    <router-link active-class="router-link-active" to="/" exact>
      <li>
        <a class="waves-effect waves-orange pointer">puk</a>
      </li>
    </router-link>
    <router-link active-class="active" to="/">
      <li>
        <a class="waves-effect waves-orange pointer">Счет</a>
      </li>
    </router-link>
    <router-link routerLinkActive="active" to="/history">
      <li>
        <a class="waves-effect waves-orange pointer">История</a>
      </li>
    </router-link>
    <router-link active-class="active" to="/planning">
      <li>
        <a class="waves-effect waves-orange pointer">Планирование</a>
      </li>
    </router-link>
    <router-link active-class="active" to="/record">
      <li>
        <a class="waves-effect waves-orange pointer">Новая запись</a>
      </li>
    </router-link>
    <router-link active-class="active" to="/categories">
      <li>
        <a class="waves-effect waves-orange pointer">Категории</a>
      </li>
    </router-link>
  </ul>
</template> -->

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
