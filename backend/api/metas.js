
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const metas = { ...req.body }
        if (req.params.id) metas.id = req.params.id

        try {
            existsOrError(metas.titulo, 'Título não informado')
            existsOrError(metas.valorEsperado, 'Valor esperado não informado')

        } catch (msg) {
            res.status(400).send(msg)
        }


        if (metas.id) {
            app.db('doacoes_com_metas')
                .update({ titulo: metas.titulo, descricao: metas.descricao, imageUrl: metas.imageUrl, valorEsperado: metas.valorEsperado, valorAtual: metas.valorAtual })
                .where({ id: metas.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('doacoes_com_metas')
                .insert({ titulo: metas.titulo, descricao: metas.descricao, imageUrl: metas.imageUrl, valorEsperado: metas.valorEsperado, valorAtual: 0, userId: req.user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('doacoes_com_metas')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Carousel não encontrado.')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const getPorUsuario = async (req, res) => {

        app.db('doacoes_com_metas')
            .where({ userId: req.user.id })
            .then(metas => res.json(metas))
            .catch(err => res.status(500).send(err))
    }

    const limit = 12; // limite de itens por página 
    const get = async (req, res) => {
        const page = req.query.page || 1 
 
        const result = await app.db('doacoes_com_metas').count('id').first()
        const count = parseInt(result.count)
                    
        app.db('doacoes_com_metas')
            .select('id', 'titulo', 'imageUrl', 'valorEsperado', 'valorAtual')
            .limit(limit).offset(page * limit - limit )
            .then(metas => res.json({ data: metas, count, limit }))
            .catch(err => res.status(500).send(err))
            
    }

    const getById = (req, res) => {
        app.db('doacoes_com_metas')
            .where({ id: req.params.id })
            .first()
            .then(metas => {
                metas.descricao = metas.descricao.toString()
                return res.json(metas)
            })
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById, getPorUsuario }
}