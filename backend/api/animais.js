
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const limit = 10 //usado para paginação

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

        if(req.user.ong || req.user.admin){
            if (animais.id && req.user.id == animais.userId) {
                app.db('animais')
                    .update({
                        tipo: animais.tipo, nome: animais.nome, sexo: animais.sexo, porte: animais.porte, imagem: animais.imagem,
                        cep: animais.cep, estado: animais.estado, cidade: animais.cidade, deficiente: animais.deficiente,
                        castrado: animais.castrado, vacinado: animais.vacinado, vermifugado: animais.vermifugado,
                        descricao: animais.descricao, status: animais.status, desaparecido: animais.desaparecido
                    })
                    .where({ id: animais.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else {
    
                if (animais.desaparecido == null) {
                    animais.desaparecido = false;
                } else {
                    animais.desaparecido = true;
                }
    
                app.db('animais')
                    .insert({
                        tipo: animais.tipo, nome: animais.nome, sexo: animais.sexo, porte: animais.porte, imagem: animais.imagem,
                        cep: animais.cep, estado: animais.estado, cidade: animais.cidade, createdAt: new Date(), userId: req.user.id,
                        deficiente: animais.deficiente, castrado: animais.castrado, vacinado: animais.vacinado,
                        vermifugado: animais.vermifugado, descricao: animais.descricao, status: "DISPONÍVEL", desaparecido: animais.desaparecido
                    })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        }else{
            res.status(401).send("Você não tem autorização! Não tente novamente!")
        }
    }

    const remove = async (req, res) => {

        const animalFromDB = await app.db('animais')
            .where({ id: req.params.id }).first()

        if (req.user.id == animalFromDB.userId) {
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
        } else {
            res.status(401).send("Você não tem autorização! Não tente novamente!")
        }
    }

    const getByUser = async (req, res) => {
        app.db('animais')
            .where({ userId: req.user.id })
            .orderBy('createdAt', 'desc')
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }

    const getAllByUser = async (req, res) => {
        app.db('animais')
            .where({ userId: req.params.id })
            .orderBy('createdAt', 'desc')
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }

    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('animais').count('id').first()
        const count = parseInt(result.count)

        app.db('animais')
            .where({ status: "DISPONÍVEL" })
            .andWhere({ desaparecido: false })
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(animais => res.json({ data: animais, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getRandom = (req, res) => {
        app.db('animais')
            .where({ status: "DISPONÍVEL" })
            .andWhere({ desaparecido: false })
            .orderBy('createdAt', 'desc')
            .limit(10)
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }

    const getLost = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('animais').count('id').first()
        const count = parseInt(result.count)

        app.db('animais')
            .where({ desaparecido: true })
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(animais => res.json({ data: animais, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('animais')
            .join('users', 'animais.userId', 'users.id')
            .select('animais.id', 'animais.tipo', 'animais.nome', 'animais.sexo', 'animais.porte', 'animais.deficiente', 'animais.vermifugado', 'animais.vacinado', 'animais.castrado', 'animais.descricao',
                'animais.estado', 'animais.cidade', 'animais.cep', 'animais.desaparecido', 'animais.userId', 'animais.status', 'animais.imagem', 'animais.createdAt', 'users.name', 'users.userImage', 'users.email', 'users.telefone')
            .where({ 'animais.id': req.params.id })
            .first()
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }

    const getLostById = (req, res) => {
        app.db('animais')
            .join('users', 'animais.userId', 'users.id')
            .select('animais.id', 'animais.tipo', 'animais.nome', 'animais.sexo', 'animais.porte', 'animais.deficiente', 'animais.vermifugado', 'animais.vacinado', 'animais.castrado', 'animais.descricao',
                'animais.estado', 'animais.cidade', 'animais.cep', 'animais.desaparecido', 'animais.userId', 'animais.status', 'animais.imagem', 'animais.createdAt', 'users.name', 'users.userImage', 'users.email', 'users.telefone')
            .where({ 'animais.id': req.params.id })
            .andWhere({ desaparecido: true })
            .first()
            .then(animais => res.json(animais))
            .catch(err => res.status(500).send(err))
    }


    // Pesquisa na página de animais
    const getCustomSearch = async (req, res) => {
        const search = { ...req.body }

        try {

            existsOrError(search.cidade, 'Informe o nome da cidade')
            existsOrError(search.estado, 'Selecione o estado')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        const page = req.query.page || 1
        const result = await app.db('animais').where({ status: "DISPONÍVEL" }).andWhere({ desaparecido: false }).count('id').first()
        const count = parseInt(result.count)

        app.db('animais')
            .where({ estado: search.estado })
            .andWhere({ cidade: search.cidade })
            .andWhere({ status: "DISPONÍVEL" })
            .andWhere({ desaparecido: false })
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(animais => res.json({ data: animais, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    // Pesquisa na página de animais desaparecidos
    const getCustomSearchLost = async (req, res) => {
        const search = { ...req.body }

        try {

            existsOrError(search.cidade, 'Informe o nome da cidade')
            existsOrError(search.estado, 'Selecione o estado')

        } catch (msg) {
            return res.status(400).send(msg)
        }

        const page = req.query.page || 1
        const result = await app.db('animais').where({ desaparecido: true }).count('id').first()
        const count = parseInt(result.count)

        app.db('animais')
            .where({ estado: search.estado })
            .andWhere({ cidade: search.cidade })
            .andWhere({ desaparecido: true })
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(animais => res.json({ data: animais, count, limit }))
            .catch(err => res.status(500).send(err))
    }



    // Muda o status de disponivel para indisponivel e virse versa
    const adopt = (req, res) => {
        const animais = { ...req.body }

        app.db('animais')
            .update({ status: animais.status })
            .where({ id: req.params.id })
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    return {
        save, remove, get, getById, getByUser, getCustomSearch,
        getAllByUser, getLost, getLostById, getCustomSearchLost,
        adopt, getRandom
    }
}