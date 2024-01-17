<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <!-- Левая часть навигационной панели -->
      <div class="navbar-left">
        <!-- Иконка для открытия боковой панели -->
        <i
          class="material-icons black-text pointer"
          @click.prevent="$emit('open')"
        >
          dehaze
        </i>
        <!-- Текстовая метка "Menu" -->
        <span class="black-text">Menu</span>
      </div>

      <!-- Правая часть навигационной панели -->
      <ul class="right hide-on-small-and-down">
        <li>
          <!-- Выпадающее меню с именем пользователя -->
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ info.name || "Username" }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <!-- Содержимое выпадающего меню -->
          <ul id="dropdown" class="dropdown-content">
            <li>
              <a class="black-text">
                {{ info.name || "Username" }}
                <hr />
                {{ info.email || "Username" }}
              </a>
            </li>
            <!-- Разделитель в меню -->
            <li class="divider" tabindex="-1"></li>
            <!-- Ссылка на профиль пользователя -->
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <!-- Разделитель в меню -->
            <li class="divider" tabindex="-1"></li>
            <!-- Ссылка для выхода из аккаунта -->
            <li>
              <a href="#" class="black-text" @click.prevent="exit">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    date: new Date(Date.UTC()),
  }),
  methods: {
    // // Используем mapActions для вызова действия logout из хранилища
    // ...mapActions("auth", ["logout"]),
    // Метод для выхода из аккаунта
    exit() {
      console.log("Exit");
      this.$router.push("/login");
      this.$store.dispatch("recipes/clearRecipes");
      this.$store.dispatch("auth/logout");
    },
  },
  computed: {
    // Используем mapState для получения информации о пользователе из хранилища
    ...mapState("info", ["info"]),
  },
  mounted() {
    // Инициализация dropdown при монтировании компонента
    // eslint-disable-next-line
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: false,
      inDuration: 40,
      outDuration: 40,
    });
  },
  beforeUnmount() {
    // Очистка интервала и dropdown при размонтировании компонента
    clearInterval(this.interval);
    clearInterval(this.dropdown);
  },
};
</script>
