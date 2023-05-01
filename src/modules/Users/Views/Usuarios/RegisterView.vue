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
                    <form class="needs-validation bhg-box-1" novalidate>
                        <div class="row g-3">
                            <div class="col-sm-6">
                                <label for="Nome" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="Nome" placeholder="" value="" required>
                                <div class="invalid-feedback">Preencha com um nome válido.</div>
                            </div>

                            <div class="col-sm-6">
                                <label for="Sobrenome" class="form-label">Sobrenome</label>
                                <input type="text" class="form-control" id="Sobrenome" placeholder="" value="" required>
                                <div class="invalid-feedback">Sobrenome válido obrigatório</div>
                            </div>

                            <div class="col-sm-12">
                                <label for="email" class="form-label">E-mail</label>
                                <input type="email" class="form-control" id="email" placeholder="seu@email.com" required>
                                <div class="invalid-feedback">Preencha com um e-mail válido.</div>
                            </div>

                            <div class="col-sm-4">
                                <label for="tel" class="form-label">Celular</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                    <input type="text" class="form-control" id="tel" placeholder="(DDD) 9999-9999" required>
                                    <div class="invalid-feedback">Celular obrigatório.</div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <label for="username" class="form-label">Senha</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    <input type="text" class="form-control" id="senha-1" placeholder="Senha" value=""
                                        required>
                                    <div class="invalid-feedback">Senha obrigatório.</div>
                                </div>
                            </div>

                            <div class="col-sm-4">
                                <label for="senha" class="form-label">Confirmar senha</label>
                                <div class="input-group has-validation">
                                    <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    <input type="password" class="form-control" id="senha-2" placeholder="Nova Senha"
                                        required>
                                    <div class="invalid-feedback">Senha obrigatória.</div>
                                </div>
                            </div>
                        </div>

                        <hr class="my-4">

                        <h4 class="mb-3">Chave PIX</h4>
                        <div class="row my-3">
                            <div class="col-md-6 mb-3">
                                <label for="" class="form-label">Tipo de Chave</label>
                                <div class="col pt-1">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio1" value="option1">
                                        <label class="form-check-label" for="inlineRadio1">CPF / CNPJ</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio2" value="option2">
                                        <label class="form-check-label" for="inlineRadio2">E-mail</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions"
                                            id="inlineRadio3" value="option3">
                                        <label class="form-check-label" for="inlineRadio3">Celular</label>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="chave-pix" class="form-label">Chave PIX</label>
                                <input type="text" class="form-control" id="chave-pix" placeholder="" required>
                                <div class="invalid-feedback">Digite uma chave válida.</div>
                            </div>
                        </div>
                        <hr class="my-4">
                        <a class="w-100 btn btn-primary btn-lg" href="home.html"><i class="far fa-edit"></i> Cadastrar</a>
                    </form>
                </div>
            </div>
            <!-- formularioEnd -->
        </div>
        <footer class="text-center">
            <div class="golden-line"></div>
            <p class="mb-1">&copy; 2023 CORINGA GAMES.</p>
        </footer>
    </div>
</template>

<script setup>

import { RouterLink } from "vue-router"

</script>

<style scoped>
* {
    color: aliceblue;
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
