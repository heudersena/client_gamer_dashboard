<template>
    <section class="p-4 position-absolute h-100 w-100 d-flex flex-column align-items-center justify-content"
        style="z-index: 1000;">

        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" class="p-4 w-25 formulario">
            <label class="text-uppercase">Digite um valor</label>
            <Field name="amount" type="number" :class="{ '': errors.amount }" class="w-100 form-control-lg"
                placeholder="Quantos quer sacar?" />
            <div class="">{{ errors.amount }}</div>

            <button class="btn btn-success mt-2 w-100 text-uppercase">
                <!-- <span v-show="paymentsIsLoading">Carregando...</span> -->
                <span
                    class="bg-[#7159c1] hover:bg-[#7159c1]/90 w-full flex justify-center p-3 rounded-sm text-white uppercase text-xs">
                    solicitar saque
                </span>
            </button>
        </Form>
        <section class="w-25 mt-2 p-4">

            <div v-for=" (w, i) in withdran.values?.data" :key="i">
                <div class="d-flex gap-2">
                    <span>{{ MoedaBR(w.amount) }}</span>
                    <span class="badge bg-warning text-dark">{{ w.status }}</span>
                </div>
            </div>


        </section>
    </section>
</template>

<style scoped>
section {
    background-color: #513d29;
}

@media screen and (max-width: 991px) {

    .formulario {
        min-width: 100% !important;
    }

}
</style>

<script setup>
const emit = defineEmits(['inFocus', 'submit'])
import { useToast } from "vue-toastification";
import * as Yup from "yup";
import { Form, Field } from "vee-validate";
import api from "../../../plugins/axios"
import { useWithdran } from "../../../composables/useWithdran"
import { MoedaBR } from "../../../plugins/convertToMoedaAndDate"
const toast = useToast();

const { withdran } = useWithdran()


const schema = Yup.object().shape({
    amount: Yup.number("Precisa ser um numero").required("Digite um valor para fazer sacar")
});

async function onSubmit(values, { setErrors }) {
    const { amount } = values;
    api.post("withdran", { amount }).then(response => {
        console.log(response.data);
        toast.success("Solicitação gerada com success");
    }).catch(err => {
        toast.error(err?.response?.data?.errorMessage)
    })
}


</script>
