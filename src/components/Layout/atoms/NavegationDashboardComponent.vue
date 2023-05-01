<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main navigation">
        <div class="container-fluid">
            <a class="navbar-brand" href="home.html"><img src="@/assets/images/coringa-games_logo.png" class="logo-cliente"
                    alt=""></a>
            <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item"><a class="nav-link" aria-current="page" href="home.html">Home</a></li> -->
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="minha-conta_edit.html">
                            <i class="bi bi-person-gear"></i>
                            Minha conta</a>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#saque-cred">
                            <i class="bi bi-currency-dollar"></i> Saque</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#mais-cred">
                            <i class="bi bi-coin"></i> Depósito</a>
                    </li> -->
                    <li class="nav-item"><a class="nav-link" href="login.html"><i class="bi bi-box-arrow-right"></i>
                            SAIR</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";

</script>
