import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";

// Определение маршрутов
const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/recipecreate",
    name: "recipeCreate",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("../views/RecipeCreate.vue"),
  },
  {
    path: "/recipeedit=:recipeId", // Динамический параметр для recipeId
    name: "recipeEdit",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("../views/RecipeEdit.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("../views/ProfileView.vue"),
  },
  {
    path: "/recipe=:recipeId", // Динамический параметр для recipeId
    name: "recipeDetails",
    meta: { layout: "main", requiresAuth: true },
    component: () => import("../views/RecipeDetails.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty", requiresAuth: false },
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty", requiresAuth: false },
    component: () => import("../views/RegisterView.vue"),
  },
];

// Создание экземпляра маршрутизатора
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Перед каждой навигацией проверяем аутентификацию
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !auth.currentUser) {
    // Если требуется аутентификация и пользователь не аутентифицирован, перенаправляем на страницу входа
    next("/login");
  } else {
    // В противном случае, позволяет продолжить навигацию
    next();
  }
});

export default router;
