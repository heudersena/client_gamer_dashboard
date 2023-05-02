<script setup>
import { ref } from "vue";

import * as Yup from "yup";

import { Form, Field } from "vee-validate";

import api from "../../../plugins/axios";

const pix = ref("");
const m_ticket_url = ref("");

const schema = Yup.object().shape({
    balance: Yup.number("Precisa ser um numero").required(
        "Digite um valor para fazer deposito"
    ),
});

async function onSubmit(values, { setErrors }) {
    const { balance } = values;
    try {

        const content = await api.post("/profile/store-deposit", {
            balance: Number(balance),
        });
        const imagem = content.data?.mercado_pago?.m_qr_code_base64;
        pix.value = imagem;
        m_ticket_url.value = content.data?.mercado_pago?.m_ticket_url;

    } catch (er) {
        console.log(er);
    }
}

</script>
<template>
   <div class="w-50 p-2">
        <div>
        <div class="d-flex flex-column align-items-center justify-content-center mb-6">
            <img src="../../../assets/images/coringa-games_logo.png" alt="" srcset="">
            <p class="mt-4 font-monospace" style="font-weight: 700;">QUANTOS VAI DEPOSITAR?</p>
         </div>
            <div class="mt-2">
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }"
                    class="flex flex-col w-full">
                    <Field name="balance" type="number" :class="{ 'bg-danger': errors.balance }" class="w-100 form-control-lg" />
                    <div class="invalid-feedback">{{  errors.balance }}</div>

                    <br />
                    <button :disabled="isSubmitting" class="btn btn-success mt-2 w-100 text-uppercase ">
                        <span v-if="isSubmitting">Carregando...</span>
                        <span v-else>Depoistar</span>
                    </button>

                    <div v-if="errors.apiError">
                        {{ errors.apiError }}
                    </div>


                <div v-if="isSubmitting">Carregando...</div>

                <div v-else>
                    <div v-if="m_ticket_url" class="w-50">
                    <p class="mt-5">Aponte a camera do seu banco, para fazer o pagamento</p>
                        <img v-if="pix" class="img-thumbnail" :src="'data:image/jpeg;charset=utf-8;base64, ' + pix" />

                        <div class="mt-3">
                            <a v-if="m_ticket_url" :href="m_ticket_url" target="_blank" class="text-white mt-5">Abrir Pagina
                                para fazer pagamento</a>
                        </div>

                    </div>
                </div>
            </Form>
            </div>

        </div>
    </div>
</template>
