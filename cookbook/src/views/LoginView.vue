<template>
  <!-- Форма для входа в аккаунт -->
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <!-- Заголовок формы -->
      <span class="card-title">Кулинарная книга рецептов</span>

      <!-- Поле ввода email -->
      <div class="input-field">
        <input
          id="email"
          type="email"
          pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          required
          class="validate"
          v-model="email"
        />
        <label for="email">Email</label>
      </div>

      <!-- Поле ввода пароля -->
      <div class="input-field">
        <input
          id="password"
          type="password"
          name="password"
          minlength="8"
          required
          class="validate"
          v-model="password"
        />
        <label for="password">Пароль</label>
      </div>
    </div>

    <div class="card-action">
      <div>
        <!-- Использование mapActions для вызова действия login из хранилища -->
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <!-- Ссылка на страницу регистрации -->
      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
// Импорт необходимых функций из Vuex
import { mapActions } from "vuex";

// Экспорт компонента LoginView
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  // Использование mapActions для вызова действия login из хранилища
  methods: {
    ...mapActions("auth", ["login"]),
    // Обработчик события отправки формы
    async submitHandler() {
      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        // Вызов действия login из хранилища
        await this.login(formData);
        // Вывод сообщения об успешном входе
        this.showToast("Вход выполнен успешно!");
        // Переход на главную страницу
        this.$router.push("/");
      } catch (e) {
        // Вывод ошибки в консоль
        console.error("Произошла ошибка при входе", e.message);
        // Вывод сообщения об ошибке входа
        this.showToast(this.getErrorToastMessage("Произошла ошибка при входе"));
      }
    },
    // Всплывающее уведомление
    showToast(message) {
      // eslint-disable-next-line
      M.toast({ html: message });
    },
    // Получение текста ошибки в зависимости от кода ошибки
    getErrorToastMessage(errorCode) {
      switch (errorCode) {
        case "auth/missing-email":
          return "Необходимо ввести адрес электронной почты";
        case "auth/invalid-credential":
          return "Пользователя с таким email не существует";
        default:
          return "Произошла ошибка при входе";
      }
    },
  },
};
</script>
