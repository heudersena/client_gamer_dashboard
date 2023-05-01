<script setup>
import { RouterLink } from "vue-router";
import { Form, Field } from "vee-validate";
import * as Yup from "yup";

import { useAuthStore } from "@/stores";
import { ref } from "vue";

const errorLogin = ref(false);

const schema = Yup.object().shape({
    username: Yup.string().required("O campo e-mail é obrigatório").email("O e-mail precisa ser válido"),
    password: Yup.string().required("O campo senha é obrigatório"),
});

function onSubmit(values, { setErrors }) {
    const { username, password } = values;

    const authStore = useAuthStore();

    return authStore.login(username, password).catch((error) => {
        errorLogin.value = true;
        setErrors({ apiError: error });
    });
}
</script>

<template>
  <div class="container min-vh-100 align-items-center d-flex flex-column justify-content-center">
    <Form class="w-50"  @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
      <div class="d-flex row justify-content-center">
        <img
          class="mb-4 w-auto"
          src="../../../../assets/images/coringa-games_logo.png"
          alt="Coringa Games Admin"
        />
        <h1 class="h3 mb-3 fw-normal text-white">Login</h1>
      </div>
      <div class="form-floating">
        <Field name="username"
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
        />
        <label for="floatingInput">E-mail</label>
        <span class="text-white"> {{ errors.username }}</span>
      </div>
      <div class="form-floating mt-3">
        <Field name="password"
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder=""
        />
        <label for="floatingPassword">Senha</label>
        <span class="text-white"> {{ errors.password }}</span>
      </div>
      <div class="mb-3">
        <a href="cadastro.html" title="" class="link-conta">Já possui uma conta?</a>
      </div>
      <div>
        <button
          class="w-100 d-flex gap-3 align-items-center justify-content-center btn btn-lg btn-primary mb-5"
          href="home.html"
          :disabled="isSubmitting"
        >
          <svg
            style="width: 30px"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          <span>Entrar</span>
        </button>
      </div>
    </Form>

    <div v-show="errorLogin"  class="bg-danger w-full rounded p-1 text-white font-bold">
        <span class="w-full">E-mail ou senha incorrentos</span>
    </div>

    <div class="container">
        <div class="row">
          <div class="col">
            <span class="w-full d-block text-center mt-5 mb-3 text-white w-full"
              >&copy; 2023 CORINGA GAMES.</span
            >
          </div>
        </div>
      </div>

  </div>
</template>

<style scoped>
html,
body {
  height: 100vh !important;
}

body {
  display: flex;
  align-items: center;
  padding-top: 140px;
  padding-bottom: 40px;
  background-image: url("../../../../assets/images/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
