<template>
    <div class="contaier">

            <div class="perfil" v-if="!user.enderecoSaved">
                <div class="perfil-header">
                    <h2>Bem-vindo, {{ user.name }}</h2>
                <hr>
                </div>
                <div class="perfil-content">
                    <p>
                        <label for="name">Nome</label>
                        <input type="text" class="form-control" v-model="user.name" name="name" readonly>
                    </p>
                    <p>
                        <label for="email">E-mail</label>
                        <input type="text" class="form-control" v-model="user.email" name="email" readonly>
                    </p>
                    <p>
                        <label for="telefone">Telefone</label>
                        <input type="text" class="form-control" v-model="user.telefone" name="telefone" readonly>   
                    </p>
                    <p>
                        <label for="cpf">CPF</label>
                        <input type="text" class="form-control" v-model="user.cpf" name="cpf" readonly>
                    </p>
                </div>
            </div>

            <div class="endereco" v-if="!user.enderecoSaved">
                <div class="endereco-content">
                    <form action="">
                        <p>
                            <label for="endereco">Endereço</label>
                            <input type="text" class="form-control" v-model="endereco.endereco" name="endereco">
                        </p>
                         <p>
                            <label for="numero">Número</label>
                            <input type="text" class="form-control" v-model="endereco.numero" name="numero">
                        </p>
                          <p>
                            <label for="complemento">Complemento</label>
                            <input type="text" class="form-control" v-model="endereco.complemento" name="complemento">
                        </p>
                         <p>
                            <label for="bairro">Bairro</label>
                            <input type="text" class="form-control" v-model="endereco.bairro" name="bairro">
                        </p>
                        <p>
                            <label for="estado">Estado</label>
                            <input type="text" class="form-control" v-model="endereco.estado" name="estado">
                        </p>
                        <p>
                            <label for="cidade">Cidade</label>
                            <input type="text" class="form-control" v-model="endereco.cidade" name="cidade">
                        </p>
                        <p>
                            <label for="cep">CEP</label>
                            <input type="text" class="form-control" v-model="endereco.cep" name="cep">
                        </p>

                        <button @click="atualizar" class="btn btn-success">Atualizar</button>
                    </form>
                </div>
            </div>

        </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'Perfil',
     data: function() {
        return {
            user: {},
            endereco: {}
        }
    },
    components: { PageTitle, Gravatar },
    computed: mapState(['user']),
       methods: {
        atualizar() {
           this.endereco.userId = this.user.id
            axios.post(`${baseApiUrl}/complete`, this.endereco)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.endereco = {}
                })
                .catch(showError)
        }
    }
}
</script>

<style>

    .perfil{
        width: 800px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        margin: auto;
    }

    .perfil-header{
        padding: 30px;
        margin: auto;
        text-align: center;
    }

    .perfil-content{
        padding: 30px;
        width: 400px;
    }

    .endereco{
        width: 800px;
        background-color: #ffffff;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        margin: auto;
    }

    .endereco-content{
        padding: 30px;
    }


</style>
