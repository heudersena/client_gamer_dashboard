<template>
  <div class="">
      <RouterView />
  </div>
</template>



<script setup>

import { RouterView, RouterLink } from "vue-router";
import LogoutIcon from "vue-material-design-icons/Logout.vue"
import CashSyncIcon from "vue-material-design-icons/CashSync.vue"
import PlusCircleIcon from "vue-material-design-icons/PlusCircle.vue"
import CashMultipleIcon from "vue-material-design-icons/CashMultiple.vue"
import CartIcon from "vue-material-design-icons/Cart.vue"
import CartOffIcon from "vue-material-design-icons/CartOff.vue"
import { useAuthStore } from "@/stores";

import { useAuth } from "../../composables/useAuth"
import { useOpenClose } from "../../composables/useOpenClose"

import MenuComponent from "../MenuComponent.vue"
import FormDepositComponet from "../FormDepositComponet.vue"
import NavigationComponent from "../NavigationComponent"


// Logount
const authStore = useAuthStore();

const { open, close, showOpenClose } = useOpenClose()
const { users } = useAuth()


function moneuBr(money) {
  return Number(money).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

</script>
