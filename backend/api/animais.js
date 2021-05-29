var moment = require('moment');

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const animais = { ...req.body }
        if (req.params.id) animais.id = req.params.id

        try {
            existsOrError(animais.tipo, 'Tipo do animal não informado')
            existsOrError(animais.nome, 'Nome do animal não informado')
            existsOrError(animais.sexo, 'Sexo do animal não informado')
            existsOrError(animais.porte, 'Porte do animal não informado')
            existsOrError(animais.imagem, 'Imagem não informada')
            existsOrError(animais.cep, 'CEP não informado')
            existsOrError(animais.estado, 'Estado não informado')
            existsOrError(animais.cidade, 'Cidade não informada')
        } catch (msg) {
            return res.status(400).send(msg)
        }



        if (animais.id) {
            app.db('animais')
                .update({
                    tipo: animais.tipo, nome: animais.nome, sexo: animais.sexo, porte: animais.porte, imagem: animais.imagem,
                    cep: animais.cep, estado: animais.estado, cidade: animais.cidade, deficiente: animais.deficiente, 
                    castrado: animais.castrado, vacinado: animais.vacinado, vermifugado: animais.vermifugado, descricao: animais.descricao
                })
                .where({ id: animais.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('animais')
                .insert({
                    tipo: animais.tipo, nome: animais.nome, sexo: animais.sexo, porte: animais.porte, imagem: animais.imagem,
                    cep: animais.cep, estado: animais.estado, cidade: animais.cidade, createdAt: new Date(), userId: req.user.id,
                    deficiente: animais.deficiente, castrado: animais.castrado, vacinado: animais.vacinado, 
                    vermifugado: animais.vermifugado, descricao: animais.descricao
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('animais')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Animal não foi encontrado')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

<<<<<<< HEAD
    const getByUser = async (req, res) => {
=======
    // const limitPorUsuario = 10 //usado para paginação
    const getPorUsuario = async (req, res) => {
        // const page = req.query.page || 1
        // const result = await app.db('animais').count('id').first()
        // const count = parseInt(result.count)
>>>>>>> 259b31135fdb30d33e58df6c96074baf1e59502b

        app.db('animais')
            .where({ userId: req.user.id })
            .orderBy('createdAt', 'desc')
            // .limit(limitPorUsuario).offset(page * limitPorUsuario - limitPorUsuario)
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }

    const limit = 10 //usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('animais').count('id').first()
        const count = parseInt(result.count)

        app.db('animais')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(animais => res.json({ data: animais, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('animais')
            .join('users', 'animais.userId', 'users.id')
            .select('animais.id', 'animais.tipo', 'animais.nome', 'animais.sexo', 'animais.porte', 'animais.deficiente', 'animais.vermifugado', 'animais.vacinado', 'animais.castrado', 'animais.descricao',
                'animais.estado', 'animais.cidade', 'animais.cep', 'animais.userId', 'animais.imagem', 'animais.createdAt', 'users.name', 'users.email', 'users.telefone')
            .where({ 'animais.id': req.params.id })
            .first()
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }


    const getCustomSearch = (req, res) => {
        const search = { ...req.body }

        try {

            existsOrError(search.cidade, 'Informe o nome da cidade')
            existsOrError(search.estado, 'Selecione o estado')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        const page = req.query.page || 1
        const result = app.db('animais').count('id').first()
        const count = parseInt(result.count)

        app.db('animais')
            .where({ estado: search.estado })
            .andWhere({ cidade: search.cidade })
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(animais => res.json({ data: animais, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getByUser, getCustomSearch }
}