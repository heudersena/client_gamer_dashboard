<script setup>
import { RouterLink } from "vue-router"
import { ref } from "vue";
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import { useRegisterStore } from "@/stores";

const schema = Yup.object().shape({
    email: Yup.string()
        .email("E-mail inválido")
        .required("O E-mail é obrigatório"),
    password: Yup.string().required("O campo senha é obrigátório"),
    lastname: Yup.string().required("O campo primeiro nome é obrigátório"),
    firstname: Yup.string().required("O campo segundo nome é obrigátório"),
    phone: Yup.string().required("O campo telefone é obrigátório"),
    KeyPix: Yup.string().required("O campochave pix é obrigátório"),
});


function onSubmit(values, { setErrors }) {
    const authRegister = useRegisterStore();
    console.log(values);
    const { password, lastname, firstname, email, phone, KeyPix } = values;
    return authRegister.register(password, lastname, firstname, email, phone, KeyPix)
}



</script>


<template>
    <div class="form-geral">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark h-">
            <div class="container-fluid">
                <RouterLink to="/" class="navbar-brand">
                    <img src="../../../../assets/images/coringa-games_logo.png" class="logo-cliente" alt="">
                </RouterLink>
                <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <RouterLink to="login" class="nav-link active">
                                Login
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container text-white">
            <div class="py-5 mb-3">
                <h1 class="title-page"><i class="fas fa-user"></i> Criar Conta</h1>
            </div>
            <!-- formulario -->
            <div class="row g-5 justify-content-center">
                <div class="col-lg-8 mt-0">
                    <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }"
                        class="needs-validation bhg-box-1" novalidate>
                        <div class="row g-3">
                            <div class="col-sm-6">
                                <label for="email" class="form-label">E-mail</label>
                                <Field type="text" class="form-control" name="email" />
                                <div class="text-danger">{{ errors.email }}</div>
                            </div>

                            <div class="col-sm-6">
                                <label for="password" class="form-label">Senha</label>
                                <Field type="text" class="form-control" name="password" />
                                <div class="text-danger">{{ errors.password }}</div>
                            </div>

                            <div class="col-sm-12">
                                <label for="lastname" class="form-label">Nome</label>
                                <Field type="text" name="lastname" class="form-control" />
                                <div class="text-danger">{{ errors.lastname }}</div>
                            </div>

                            <div class="col-sm-4">
                                <label for="firstname" class="form-label">Sobrenome</label>
                                    <Field type="text" name="firstname" class="form-control" />
                                    <div class="text-danger">{{ errors.firstname }}</div>
                            </div>

                            <div class="col-sm-4">
                                <label for="phone" class="form-label">Celular</label>
                                    <Field type="text" class="form-control" name="phone" />
                                    <div class="text-danger">{{ errors.phone }}</div>
                            </div>

                            <div class="col-sm-4">
                                <label for="senha" class="form-label">Chave Pix</label>
                                    <Field type="text" class="form-control" name="KeyPix" />
                                    <div class="text-danger">{{ errors.KeyPix }}</div>
                            </div>
                        </div>

                       <div class="mt-5">
                       <button :disabled="isSubmitting" class="w-100 btn btn-primary btn-lg">Cadastrar</button>
                       </div>

                    </Form>
                </div>
            </div>
            <!-- formularioEnd -->
        </div>
        <!-- <footer class="text-center">
            <div class="golden-line"></div>
            <p class="mb-1">&copy; 2023 CORINGA GAMES.</p>
        </footer> -->
    </div>
</template>



<style scoped>
* {

}

.form-geral {
    position: relative;
    height: 100%;
}

footer {
    position: absolute;
    width: 100%;
    bottom: 0;
}
</style>
