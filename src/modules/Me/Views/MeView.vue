<script setup>
import { useAsyncState } from "@vueuse/core"
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useAuthStore } from "@/stores";
import api from "../../../plugins/axios";
import { StatusTransaction } from "../../../plugins/enums/StatusTransaction"
import { TypeTransaction } from "../../../plugins/enums/TypeTransaction"
import { MoedaBR } from "../../../plugins/convertToMoedaAndDate"
import { DateTimeConvert } from "../../../plugins/DateTimeConvert"
import ModalDeposito from "./ModalDeposito.vue"
import { useAuth } from "../../../composables/useAuth"

const { users } = useAuth()
const { logout } = useAuthStore()

const app = getCurrentInstance()
const socket = app.appContext.config.globalProperties.$socket

socket.on("new-deposit", data => {
    console.log("HomeView.vue: ", data);
})

const { state: transactions, isLoading } = useAsyncState(api.post("/transaction").then(t => t.data), [], { resetOnExecute: true })

onMounted(() => {
    socket.on("new-deposit", data => {
        transactions.value = data.new_array
    })
})

const openOrClose = ref(false)
function FnOpenOrClose() {
    openOrClose.value = !openOrClose.value
}

</script>
<template>
    <!-- STARTNAV -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main navigation">
        <div class="container-fluid">
            <a class="navbar-brand" href="home.html"><img src="../../../assets/images/coringa-games_logo.png"
                    class="logo-cliente" alt=""></a>
            <button class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item"><a class="nav-link" aria-current="page" href="home.html">Home</a></li>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="minha-conta_edit.html"><i class="fas fa-user-cog"></i>
                            Minha conta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#saque-cred"><i
                                class="fas fa-comment-dollar"></i> Saque</a>
                    </li>
                    <li class="nav-item">
                        <a @click="FnOpenOrClose" class="nav-link" href="#" data-bs-toggle="modal"
                            data-bs-target="#mais-cred"><i class="fas fa-coins"></i> Depósito</a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#" @click="logout"><i class="fas fa-sign-out-alt"></i> SAIR</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- ENDNAV -->

    <main class="container mt-5">
        <div v-if="openOrClose"
            class="position-absolute min-vh-100  w-100 top-0  end-0 bottom-0 d-flex flex-column justify-content-center align-items-center"
            style="z-index: 100; background-color: #513d29;">
            <button @click="FnOpenOrClose" class="position-absolute top-0 end-0 btn text-white"
                style="margin-top: 10px; margin-right: 5px; color: aliceblue !important; font-weight: 700;">X</button>
            <ModalDeposito />
        </div>
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col-4 text-end d-flex justify-content-end">
                        <div class="avatar">
                            <img src="../../../assets/images/avatar1.jpg" class="img-responsive">
                        </div>
                    </div>
                    <div class="col">
                        <ul class="list-group mb-3">
                            <li class="list-group-item d-flex justify-content-between lh-sm">
                                <h6 class="my-0 text-white"><strong>{{ users?.first_name }} {{ users?.second_name
                                }}</strong></h6>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-sm">
                                <h6 class="my-0">E-mail</h6>
                                <span class="text-muted">{{ users?.email }}</span>
                            </li>
                            <!-- <li class="list-group-item d-flex justify-content-between lh-sm">
                                <h6 class="my-0">ID #</h6>
                                <span class="text-muted">QW23-JI67-W0987-MN28</span>
                            </li> -->
                            <li class="list-group-item d-flex justify-content-between lh-sm">
                                <h6 class="my-0">PIX:</h6>
                                <small class="text-muted">{{ users?.keyPix }}</small>
                            </li>
                            <li class="list-group-item d-flex justify-content-between lh-sm">
                                <h6 class="my-0">Celular:</h6>
                                <small class="text-muted">{{ users?.phone }}</small>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <h6 class="my-0"><i class="fas fa-wallet"></i> Saldo</h6>
                                <span class=""><strong>{{ MoedaBR(users?.balance) }}</strong></span>
                            </li>
                            <li class="list-group-item d-flex justify-content-between">
                                <h6 class="my-0"><i class="fas fa-wallet"></i> Bonus</h6>
                                <span class=""><strong>{{ MoedaBR(users?.bonus) }}</strong></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Listagem das movimentações -->
            <div class="col-md-7 col-lg-7">
                <span v-if="isLoading">carregando..</span>
                <!-- <div v-if="transaction" class="text-center text-uppercase ">você não possui nenhuma transção pendente</div> -->
                <ul v-else class="lista-tabela">
                    <div v-if="Boolean(!transactions[0])" class="text-uppercase text-center">você não tem transações
                        pendentes.</div>
                    <div v-else>
                        <li class="text-uppercase">
                            <div class="col-valor">Valor</div>
                            <div class="col-data">Data</div>
                            <div class="col-op">Operação</div>
                            <div class="col-status">Status</div>
                            <div>Pagamento</div>
                        </li>
                        <li v-for="(transaction, i) in transactions" :key="i">
                            <div class="col-valor">{{ MoedaBR(transaction?.balance) }}</div>
                            <div class="col-data">{{ DateTimeConvert(transaction?.created_at) }}</div>
                            <div class="col-op">{{ TypeTransaction(transaction?.type_transaction) }}</div>
                            <div class="col-status"><span class="badge bg-warning rounded-pill me-1"> {{
                                StatusTransaction(transaction?.mercado_pago_transaction_status) }}</span></div>
                                <div>  <a :href="transaction?.MercadoPago[0].m_ticket_url" target="_blank" rel="noopener noreferrer">Abrir</a> </div>
                        </li>
                    </div>
                </ul>
            </div>

            <!-- Listagem das movimentações -->
        </div>
    </main>
</template>

<style scoped>
* {
    color: rgb(197, 197, 197) !important;
}

.dev-custom {
    width: 100%;
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    background-color: blue;
}
</style>
