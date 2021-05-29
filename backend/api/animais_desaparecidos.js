module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const animais_desaparecidos = { ...req.body }
        if (req.params.id) animais_desaparecidos.id = req.params.id

        try {
            existsOrError(animais_desaparecidos.tipo, 'Tipo do animal não informado')
            existsOrError(animais_desaparecidos.nome, 'Nome do animal não informado')
            existsOrError(animais_desaparecidos.sexo, 'Sexo do animal não informado')
            existsOrError(animais_desaparecidos.porte, 'Porte do animal não informado')
            existsOrError(animais_desaparecidos.imagem, 'Imagem não informada')
            existsOrError(animais_desaparecidos.cep, 'CEP não informado')
            existsOrError(animais_desaparecidos.estado, 'Estado não informado')
            existsOrError(animais_desaparecidos.cidade, 'Cidade não informada')
            existsOrError(animais_desaparecidos.descricao, 'Informe uma descrição')
        } catch (msg) {
            return res.status(400).send(msg)
        }
        
        if (animais_desaparecidos.id) {
            app.db('animais_desaparecidos')
                .update(animais_desaparecidos)
                .where({ id: animais_desaparecidos.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            animais_desaparecidos.userId = req.user.id;

            animais_desaparecidos.createdAt = new Date();

            app.db('animais_desaparecidos')
                .insert(animais_desaparecidos)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('animais_desaparecidos')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Não encontramos seu animal')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const getPorUsuario = async (req, res) => {
console.log("erro01")
        app.db('animais_desaparecidos')
        console.log("erro02")
            .where({ userId: req.user.id })
            console.log("erro03")
            .then(animais_desaparecidos => res.json(animais_desaparecidos))
            console.log("erro04")
            .catch(err => res.status(500).send(err))
            console.log("erro05")
    }

    const limit = 10 //usado para paginação
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('animais_desaparecidos').count('id').first()
        const count = parseInt(result.count)

        app.db('animais_desaparecidos')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(animais_desaparecidos => res.json({ data: animais_desaparecidos, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('animais_desaparecidos')
            .join('users', 'animais_desaparecidos.userId', 'users.id')
            .select('animais_desaparecidos.id', 'animais_desaparecidos.tipo', 'animais_desaparecidos.nome', 'animais_desaparecidos.sexo', 'animais_desaparecidos.porte', 'animais_desaparecidos.descricao',
                'animais_desaparecidos.estado', 'animais_desaparecidos.cidade', 'animais_desaparecidos.cep', 'animais_desaparecidos.userId', 'animais_desaparecidos.imagem', 'animais_desaparecidos.createdAt','users.name', 'users.email')
            .where({ 'animais_desaparecidos.id': req.params.id })
            .first()
            .then(animais_desaparecidos => res.json(animais_desaparecidos))
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById, getPorUsuario}
}