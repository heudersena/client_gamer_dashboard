<script setup>
import { ref, getCurrentInstance } from "vue";

import * as Yup from "yup";

import { Form, Field } from "vee-validate";

import api from "../../../plugins/axios";

const pix = ref("");
const m_ticket_url = ref("");

const app = getCurrentInstance()
const socket = app.appContext.config.globalProperties.$socket

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

socket.on("new-deposit", data => {
        console.log("socketModal: ",data);
    })

</script>
<template>
   <div class="w-100 p-2">
        <div>
            <div class="">
                <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }"
                    class="flex flex-col w-full">
                    <Field name="balance" type="number" :class="{ 'bg-danger': errors.balance }" class="w-100 form-control-lg" />
                    <div class="invalid-feedback">{{ errors }}</div>

                    <br />
                    <button :disabled="isSubmitting" class="btn btn-success mt-2 w-100 ">
                        <span v-show="isSubmitting">Carregando...</span>
                        <span v-show="!isSubmitting">Depoistar</span>
                    </button>

                    <div v-if="errors.apiError">
                        {{ errors.apiError }}
                    </div>
                </Form>

                <div v-if="isSubmitting">Carregando...</div>

                <div v-else>
                    <div v-if="m_ticket_url" class="w-100">
                        <img v-if="pix" class="img-thumbnail mt-5" :src="'data:image/jpeg;charset=utf-8;base64, ' + pix" />

                        <div class="mt-3">
                            <a v-if="m_ticket_url" :href="m_ticket_url" target="_blank" class="text-white mt-5">Abrir Pagina
                                para fazer pagamento</a>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    </div>
</template>
