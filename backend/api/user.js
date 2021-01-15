const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const ecryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        const endereco = { ...req.body }
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.telefone, 'Telefone não informado')
            // existsOrError(user.cpf, 'CPF não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação da senha inválida')
            equalsOrError(user.password, user.confirmPassword, 
               'Senhas não conferem')

            existsOrError(endereco.endereco, 'Endereço não informado')
            existsOrError(endereco.numero, 'Número não informado')
            existsOrError(endereco.complemento, 'Complemento não informado')
            existsOrError(endereco.bairro, 'Bairro não informado')
            existsOrError(endereco.estado, 'Estado não informado')
            existsOrError(endereco.cidade, 'Cidade não informado')
            existsOrError(endereco.cep, 'CEP não informado')

               const userFromDB = await app.db('users')
                    .where({ email: user.email }).orWhere({ cpf: user.cpf }).orWhere({ cnpj: user.cnpj }).first()
                if(!user.id){
                    notExistsOrError(userFromDB, 'E-mail, CPF ou CNPJ já cadastrados')
                }


        }catch(msg){
            return res.status(400).send(msg)
        }

        user.password = ecryptPassword(user.password)
        delete user.confirmPassword

        if(user.id){
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{


              app.db("users")
                .insert({ name: user.name, email: user.email, telefone: user.telefone, cpf: user.cpf, cnpj: user.cnpj, password: user.password, ong: user.ong, admin: user.admin })
                .returning('id')
                .then(function (response) {
                    app.db('endereco')
                    .insert({endereco: user.endereco, numero: user.numero, complemento: user.complemento, bairro: user.bairro, estado: user.bairro, cidade: user.cidade, cep: user.cep, userId: response[0] })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
                  });

        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'telefone', 'cpf', 'cnpj', 'ong', 'admin')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'telefone', 'cpf', 'cnpj', 'ong', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))

    }

    const remove = async (req, res) => {
        try{
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}