const bcrypt = require('bcrypt-nodejs')
const { cnpj } = require('cpf-cnpj-validator');
const { cpf } = require('cpf-cnpj-validator');

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const ecryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }
        const endereco = { ...req.body }
        if (req.params.id) user.id = req.params.id

        if (!req.originalUrl.startsWith('/users')) user.admin = false
        if (!req.user || !req.user.admin) user.admin = false

        if (user.cpf == null) {
            user.ong = true;
            user.cpf = user.cnpj;
        } else if (user.cnpj == null) {
            user.ong = false;
            user.cnpj = user.cpf;
        }

        user.cnpj = user.cnpj.replace(/\D/g, "")
        const validatedCnpj = cnpj.isValid((user.cnpj))

        user.cpf = user.cpf.replace(/\D/g, "")
        const validatedCpf = cpf.isValid((user.cpf))



        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.telefone, 'Telefone não informado')
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

            if (user.ong && !validatedCnpj) res.status(400).send("Insira um CNPJ valído")

            if (!user.ong && !validatedCpf) res.status(400).send("Insira um CPF valído")


            if (user.cpf == null) {
                const userFromDB = await app.db('users')
                    .where({ email: user.email }).orWhere({ cnpj: user.cnpj }).first()
                if (!user.id) {
                    notExistsOrError(userFromDB, 'E-mail ou CNPJ já cadastrados')
                }
            } else {
                const userFromDB = await app.db('users')
                    .where({ email: user.email }).orWhere({ cpf: user.cpf }).first()
                if (!user.id) {
                    notExistsOrError(userFromDB, 'E-mail ou CPF já cadastrados')
                }
            }


        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = ecryptPassword(user.password)
        delete user.confirmPassword

        if (user.id) {
            if (validatedCnpj == true || validatedCpf == true) {
                app.db('users')
                    .update({
                        name: user.name, email: user.email, telefone: user.telefone, cpf: user.cpf, cnpj:
                            user.cnpj, password: user.password, userImage: user.userImage
                    })
                    .where({ id: user.id })
                    .whereNull('deletedAt')
                    .then(function (response) {
                        app.db('endereco')
                            .update({
                                endereco: user.endereco, numero: user.numero, complemento: user.complemento, bairro: user.bairro,
                                estado: user.estado, cidade: user.cidade, cep: user.cep, userId: response[0]
                            })
                            .where({ userId: user.id })
                            .then(_ => res.status(204).send())
                            .catch(err => res.status(500).send(err))
                    });
            }
        } else {
            if (validatedCnpj === true || validatedCpf === true) {
                app.db("users")
                    .insert({
                        name: user.name, email: user.email, telefone: user.telefone, cpf: user.cpf, cnpj: user.cnpj, password: user.password,
                        ong: user.ong, admin: user.admin, createdAt: new Date(), userImage: user.userImage
                    })
                    .returning('id')
                    .then(function (response) {
                        app.db('endereco')
                            .insert({ endereco: user.endereco, numero: user.numero, complemento: user.complemento, bairro: user.bairro, estado: user.estado, cidade: user.cidade, cep: user.cep, userId: response[0] })
                            .then(_ => res.status(204).send())
                            .catch(err => res.status(500).send(err))
                    });
            }
        }
    }

    const setAdmin = (req, res) => {
        const user = { ...req.body }

        if (user.admin) {
            user.admin = false;
            app.db('users')
                .update({ admin: user.admin })
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            user.admin = true;
            app.db('users')
                .update({ admin: user.admin })
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const getAdmins = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'telefone', 'admin')
            .where({ 'admin': true })
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const get = (req, res) => {
        app.db('users')
            .join('endereco', 'users.id', 'endereco.userId')
            .select('users.id', 'users.name', 'users.userImage', 'users.email', 'users.telefone', 'users.cpf', 'users.cnpj', 'users.ong', 'users.admin', 'users.createdAt',
                'endereco.endereco', 'endereco.numero', 'endereco.bairro', 'endereco.estado', 'endereco.cidade', 'endereco.cep')
            .whereNull('users.deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))

    }

    const getById = (req, res) => {
        app.db('users')
            .join('endereco', 'users.id', 'endereco.userId')
            .select('users.id', 'users.name', 'users.email', 'users.userImage', 'users.telefone', 'users.cpf', 'users.cnpj', 'users.ong', 'users.admin',
                'endereco.endereco', 'endereco.numero', 'endereco.complemento', 'endereco.bairro', 'endereco.estado', 'endereco.cidade', 'endereco.cep')
            .where({ 'users.id': req.params.id })
            .whereNull('users.deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const limit = 12; // limite de itens por página 
    const getOngs = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('users').count('id').first()
        const count = parseInt(result.count)

        app.db('users')
            .join('endereco', 'users.id', 'endereco.userId')
            .select('users.id', 'users.name', 'users.email', 'users.telefone', 'users.userImage', 'users.cnpj', 'users.ong', 'users.createdAt',
                'endereco.endereco', 'endereco.numero', 'endereco.complemento', 'endereco.bairro', 'endereco.estado', 'endereco.cidade', 'endereco.cep')
            .limit(limit).offset(page * limit - limit)
            .where({ 'users.ong': true })
            .then(user => res.json({ data: user, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getOngsSearch = async (req, res) => {
        const search = { ...req.body }

        const page = req.query.page || 1
        const result = await app.db('users').where({ ong: true }).count('id').first()
        const count = parseInt(result.count)


        app.db('users')
            .join('endereco', 'users.id', 'endereco.userId')
            .select('users.id', 'users.name', 'users.email', 'users.telefone', 'users.userImage', 'users.cnpj', 'users.ong',
                'endereco.endereco', 'endereco.numero', 'endereco.complemento', 'endereco.bairro', 'endereco.estado', 'endereco.cidade', 'endereco.cep')
            .where({ 'users.ong': true })
            .andWhere('users.name', 'like', `%${search.name}%`)
            // .andWhere({ 'endereco.estado': search.estado })
            // .andWhere('endereco.cidade', 'like', `%${search.cidade}%`)
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(users => res.json({ data: users, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getOngById = async (req, res) => {
        app.db('users')
            .join('endereco', 'users.id', 'endereco.userId')
            .select('users.id', 'users.name', 'users.email', 'users.telefone', 'users.userImage', 'users.cnpj', 'users.ong',
                'endereco.endereco', 'endereco.numero', 'endereco.complemento', 'endereco.bairro', 'endereco.estado', 'endereco.cidade', 'endereco.cep')
            .where({ 'users.id': req.params.id })
            .andWhere({ 'users.ong': true })
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))

    }

    const searchUser = async (req, res) => {
        const search = { ...req.body }
        console.log(search)
        app.db('users')
            .join('endereco', 'users.id', 'endereco.userId')
            .select('users.id', 'users.name', 'users.email', 'users.admin', 'users.deletedAt', 'endereco.estado')
            .where('users.name', 'ilike', `%${search.name}%`)
            .orderBy('id', 'desc')
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch (msg) {
            res.status(400).send(msg)
        }
    }

    const newPassword = async (req, res) => {
        const userPassword = { ...req.body }

        try {
            existsOrError(userPassword.password, 'Senha Atual não informada')
            existsOrError(userPassword.newPassword, 'Nova senha não informada')
            existsOrError(userPassword.confirmPassword, 'Confirmação da senha atual não informada')
            equalsOrError(userPassword.newPassword, userPassword.confirmPassword,
                'Senhas não conferem')


        } catch (msg) {
            return res.status(400).send(msg)
        }


        const user = await app.db('users')
            .where({ id: req.user.id })
            .first()

        const isMatch = bcrypt.compareSync(userPassword.password, user.password)
        if (!isMatch) return res.status(401).send('A senha atual que você digitou não é igual a sua senha cadastrada')
        else {
            userPassword.newPassword = ecryptPassword(userPassword.newPassword)
            delete userPassword.confirmPassword

            app.db('users')
                .update({ password: userPassword.newPassword })
                .where({ id: req.user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }

    }


    return { save, get, getById, remove, getOngs, getOngById, setAdmin, getAdmins, newPassword, getOngsSearch, searchUser }
}