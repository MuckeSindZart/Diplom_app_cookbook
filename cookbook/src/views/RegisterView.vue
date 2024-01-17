<template>
  <!-- Форма для регистрации -->
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
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
      <!-- Поле ввода имени пользователя -->
      <div class="input-field">
        <input
          type="text"
          id="name"
          name="name"
          required
          minlength="4"
          class="validate"
          v-model="userName"
        />
        <label for="name">Имя</label>
      </div>
      <!-- Чекбокс с согласием на правила -->
      <p>
        <label>
          <input type="checkbox" required class="validate" />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <!-- Кнопка для регистрации, используем mapActions для вызова действия register из хранилища -->
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>
      <!-- Сообщение о возможности входа -->
      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "RegisterView",
  computed: {
    ...mapState("auth", ["error"]),
    ...mapGetters("auth", ["getUid"]),
  },
  data() {
    return {
      email: "", // Переменная для хранения email
      userName: "", // Переменная для хранения имени пользователя
      password: "", // Переменная для хранения пароля
    };
  },
  methods: {
    // Метод для вывода всплывающего сообщения
    showToast(message) {
      // eslint-disable-next-line
      M.toast({ html: message });
    },
    // Используем mapActions для вызова действия register из хранилища
    ...mapActions("auth", ["register", "clearInfo"]),

    // Обработчик события отправки формы
    async submitHandler() {
      const formData = {
        email: this.email,
        password: this.password,
        name: this.userName,
      };

      try {
        // Вызываем действие register из хранилища
        await this.$store.dispatch("auth/register", formData);
        this.showToast("Пользователь успешно зарегистрирован!");
        console.log("Пользователь успешно зарегистрирован!");
        this.$router.push("/");
      } catch (e) {
        this.showToast(this.getErrorToastMessage(this.error.code || "puk"));
        console.error("Error during registration:", this.error.message);
      }
    },
    // Метод для получения текста ошибки в зависимости от кода ошибки
    getErrorToastMessage(errorCode) {
      switch (errorCode) {
        case "auth/user-not-found":
          return "Пользователя с таким email не существует";
        case "auth/wrong-password":
          return "Неверный пароль";
        case "auth/email-already-in-use":
          return "Email уже занят";
        default:
          return "Произошла ошибка при регистрации";
      }
    },
  },
};
</script>
