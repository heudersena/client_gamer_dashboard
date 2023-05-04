<script setup>
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import { RouterLink } from "vue-router"
import { useAsyncState } from "@vueuse/core"
import { getCurrentInstance, onMounted, ref } from 'vue'
import { useAuthStore } from "@/stores";
import api from "../../../plugins/axios";
import { StatusTransaction } from "../../../plugins/enums/StatusTransaction"
import { TypeTransaction } from "../../../plugins/enums/TypeTransaction"
import { MoedaBR } from "../../../plugins/convertToMoedaAndDate"
import { DateTimeConvert } from "../../../plugins/DateTimeConvert"
import ModalDeposito from "./ModalDeposito.vue"
import ModalSaque from "./ModalSaque.vue"
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
const openOrCloseMenu = ref(false)
const openOrCloseMenuTo = ref(true)

const openOrCloseModalSaque = ref(false)
function FnOpenOrCloseModalSaque() {
    console.log(new Date().toTimeString());
    openOrCloseModalSaque.value = !openOrCloseModalSaque.value
}

function FnOpenOrClose() {
    openOrClose.value = !openOrClose.value
}
function FnOpenOrCloseMenu() {
    openOrCloseMenu.value = !openOrCloseMenu.value
}

const value = ref('')

</script>
<template>
    <!-- STARTNAV -->
    <nav v-show="openOrCloseMenu" class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main navigation">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">
                <img src="../../../assets/images/coringa-games_logo.png" class="logo-cliente" alt="">
            </RouterLink>
            <button @click="FnOpenOrCloseMenu" class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                        <RouterLink to="/" class="navbar-brand">Home</RouterLink>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#"><i class="fas fa-user-cog"></i>
                            Minha conta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="FnOpenOrCloseModalSaque" data-bs-toggle="modal"
                            data-bs-target="#saque-cred"><i class="fas fa-comment-dollar"></i> Saque</a>
                    </li>
                    <li class="nav-item">
                        <a @click="FnOpenOrClose" class="nav-link" href="#" data-bs-toggle="modal"
                            data-bs-target="#mais-cred"><i class="fas fa-coins"></i> Depósito</a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#" @click="logout"><i class="fas fa-sign-out-alt"></i>
                            SAIR</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <nav v-show="!openOrCloseMenu" class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Main navigation">
        <div class="container-fluid">
            <RouterLink to="/" class="navbar-brand">
                <img src="../../../assets/images/coringa-games_logo.png" class="logo-cliente" alt="">
            </RouterLink>
            <button @click="FnOpenOrCloseMenu" class="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div v-show="openOrCloseMenu" class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <!-- <li class="nav-item">
                        <RouterLink to="/" class="navbar-brand">Home</RouterLink>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#"><i class="fas fa-user-cog"></i>
                            Minha conta</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" style="cursor: pointer;" @click="FnOpenOrCloseModalSaque" data-bs-toggle="modal"
                            data-bs-target="#saque-cred"><i class="fas fa-comment-dollar"></i> Saque</a>
                    </li>
                    <li class="nav-item">
                        <a @click="FnOpenOrClose" class="nav-link" href="#" data-bs-toggle="modal"
                            data-bs-target="#mais-cred"><i class="fas fa-coins"></i> Depósito</a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="#" @click="logout"><i class="fas fa-sign-out-alt"></i>
                            SAIR</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- ENDNAV -->
        <div v-if="openOrCloseModalSaque" class="">
            <div @click="FnOpenOrCloseModalSaque" style="background-color: #513d29; cursor: pointer;">
                <sapn class="dev-btn">
                    FECHAR
                </sapn>
            </div>
            <ModalSaque />
        </div>
    <main class="container mt-5">
        <div v-if="openOrClose"
            class="position-absolute min-vh-100  w-100 top-0  end-0 bottom-0 d-flex flex-column justify-content-center align-items-center"
            style="z-index: 100; background-color: #513d29;">
            <button @click="FnOpenOrClose" class="position-absolute top-0 end-0 btn text-white"
                style="margin-top: 10px; margin-right: 5px; color: aliceblue !important; font-weight: 700;">X</button>
            <ModalDeposito />

        </div>

        <div class="row media-sm">
            <div class="col">
                <div class="row">
                    <div class="col-4 text-end d-flex justify-content-end me-perfil">
                        <div class="avatar">
                            <img :src="'https://ui-avatars.com/api/?name='+users?.first_name +' '+ users?.second_name" class="img-responsive">
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
            <div class="col-md-7 col-lg-7" id="dev-w-100">
                <span v-if="isLoading">carregando..</span>
                <!-- <div v-if="transaction" class="text-center text-uppercase ">você não possui nenhuma transção pendente</div> -->
                <ul v-else class="lista-tabela">
                    <div v-if="Boolean(!transactions[0])" class="text-uppercase text-center">você não tem transações
                        pendentes.</div>
                    <div v-else class="correr">
                        <li class="text-uppercase">
                            <div class="col-valor">Valor</div>
                            <div class="col-data">Data</div>
                            <div class="col-op">Operação</div>
                            <div class="col-status">Status</div>
                            <div></div>
                        </li>
                        <li v-for="(transaction, i) in transactions" :key="i">
                            <div class="col-valor">{{ MoedaBR(transaction?.balance) }}</div>
                            <div class="col-data">{{ DateTimeConvert(transaction?.created_at) }}</div>
                            <div class="col-op">{{ TypeTransaction(transaction?.type_transaction) }}</div>
                            <div class="col-status"><span class="badge bg-warning rounded-pill me-1"> {{
                                StatusTransaction(transaction?.mercado_pago_transaction_status) }}</span></div>
                            <div> <a :href="transaction?.MercadoPago[0].m_ticket_url" target="_blank"
                                    rel="noopener noreferrer">Abrir</a> </div>
                        </li>
                    </div>
                </ul>
            </div>
            <ul class="view-phone">
                <li v-for="(transaction, i) in transactions" :key="i">
                    <div>{{ MoedaBR(transaction?.balance) }}</div>
                    <div>{{ DateTimeConvert(transaction?.created_at) }}</div>
                    <div>{{ TypeTransaction(transaction?.type_transaction) }}</div>
                    <div><span class="badge bg-warning rounded-pill me-1"> {{
                        StatusTransaction(transaction?.mercado_pago_transaction_status) }}</span></div>
                    <div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-sm bg-primary mt-3 text-uppercase"
                                @click="toClipboard(value = transaction?.MercadoPago[0]?.m_qr_code)">Copy - código de
                                pagamento PIX</button>
                            <a :href="transaction?.MercadoPago[0].m_ticket_url" target="_blank">Abrir</a>
                        </div>
                    </div>

                </li>
            </ul>


            <!-- Listagem das movimentações -->
        </div>


    </main>
</template>

<style scoped>
.dev-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: rgb(165, 57, 57);
    margin-top: 2px;
}

/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

* {
    color: rgb(197, 197, 197) !important;
}

.view-phone {
    visibility: hidden;
}

@media screen {}



@media screen and (max-width: 991px) {
    #dev-w-100 {
        widows: 100% !important;
    }

    .lista-tabela {
        position: absolute;
    }

    .view-phone {
        visibility: visible;
        padding: 0px 5px 0px 5px;
        widows: 100%;
    }

    .view-phone li {
        list-style: none;
        /* border-bottom: 1px solid silver !important; */
        background-color: rgb(9, 9, 9);

        margin-bottom: 5px;
        padding: 10px;
        border-radius: 4px;
    }

    .view-phone li a {
        background-color: rgb(21, 147, 9);
        display: block;
        margin-top: 4px;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
    }

    .me-perfil {
        visibility: hidden;
        margin-top: -110px;
        position: absolute;
    }

    .media-sm {
        display: flex;
        flex-direction: column !important;
        padding-right: 1px;
    }

    .correr {
        visibility: hidden;
    }
}

.dev-custom {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center !important;
    justify-content: center !important;
    background-color: blue;
}
</style>
