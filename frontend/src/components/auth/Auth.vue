<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/logo.png" width="200" alt="Logo" />
            <hr>
            <div class="auth-title"><h2>{{ showSignup ? 'Cadastro' : 'Login' }}</h2></div>

                <input v-if="showSignup" class="form-control" v-model="user.name" type="text" placeholder="Nome">
                <input v-model="user.email" class="form-control" name="email" type="text" placeholder="E-mail">
                <input v-if="showSignup" class="form-control" v-model="user.cpf" name="cpf" type="text" placeholder="CPF">
                <input v-if="showSignup" class="form-control" v-model="user.cnpj" name="cnpj" type="text" placeholder="CNPJ">
                <input v-if="showSignup" class="form-control" v-model="user.telefone" name="telefone" type="text" placeholder="Telefone">
                <label v-if="showSignup" @click.prevent="showCnpj = !showCnpj" for="ong">Sou uma ONG</label>
                <input v-if="showSignup" class="form-control" v-model="user.ong" name="ong" type="checkbox">
                <input v-model="user.password" class="form-control" name="password" type="password" placeholder="Senha">
                <input v-if="showSignup" class="form-control" v-model="user.confirmPassword"
                    type="password" placeholder="Confirme a Senha">
            <!-- <input v-if="showSignup" class="form-control" v-model="endereco.endereco" name="endereco" type="text" placeholder="Endereço">
            <input v-if="showSignup" class="form-control" v-model="endereco.numero" name="numero" type="text" placeholder="Número">
            <input v-if="showSignup" class="form-control" v-model="endereco.complemento" name="complemento" type="text" placeholder="Complemento">
            <input v-if="showSignup" class="form-control" v-model="endereco.bairro" name="bairro" type="text" placeholder="Bairro">
            <input v-if="showSignup" class="form-control" v-model="endereco.estado" name="estado" type="text" placeholder="Estado">
            <input v-if="showSignup" class="form-control" v-model="endereco.cidade" name="cidade" type="text" placeholder="Cidade">
            <input v-if="showSignup" class="form-control" v-model="endereco.cep" name="cep" type="text" placeholder="CEP"> -->

            <button v-if="showSignup" @click="signup" class="btn btn-success">Registrar</button>
            <button v-else @click="signin" class="btn btn-success" >Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
                <span v-else>Não tem cadastro? Registre-se aqui!</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            showCnpj: false,
            user: {},
            endereco: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)

            // axios.post(`${baseApiUrl}/endereco`, this.endereco)
            //     .then(() => {
            //         this.$toasted.global.defaultSuccess()
            //         this.endereco = {}
            //         this.showSignup = false
            //     })
            //     .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 400px;
        padding: 35px;
        border-radius: 5px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        /* background-color: #2460ae;
        border-color: #2460ae; */
        border-radius: 5px;
        width: 100%;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>
