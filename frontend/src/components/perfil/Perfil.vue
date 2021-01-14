<template>
    <div class="contaier">

            <div class="perfil">
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


        </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'
// import { baseApiUrl, showError } from '@/global'
// import axios from 'axios'

export default {
    name: 'Perfil',
     data: function() {
        return {
            user: {},
        }
    },
    components: { PageTitle, Gravatar },
    computed: mapState(['user']),
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
