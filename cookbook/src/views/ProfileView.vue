<template>
  <div>
    <div class="row profile">
      <h3>Profile</h3>

      <div class="profile-info">
        <p>Имя: {{ info.name }}</p>
        <p>Email: {{ info.email }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("info", ["info"]),
  },
};
</script>

<style scoped>
/* Переименованные стили */
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.profile-heading {
  font-size: 24px;
  margin-bottom: 10px;
}

.profile-text {
  margin-bottom: 8px;
}
</style>
