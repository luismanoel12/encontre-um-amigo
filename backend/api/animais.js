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
            res.status(400).send(msg)
        }

        animais.userId = req.user.id;

        if (animais.id) {
            app.db('animais')
                .update(animais)
                .where({ id: animais.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('animais')
                .insert(animais)
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

    const getPorUsuario = async (req, res) => {

        app.db('animais')
            .where({ userId: req.user.id })
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }

    const limit = 20 //usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('animais').count('id').first()
        const count = parseInt(result.count)

        app.db('animais')
            .limit(limit).offset(page * limit - limit)
            .then(animais => res.json({ data: animais, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('animais')
            .where({ id: req.params.id })
            .first()
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById, getPorUsuario }
}