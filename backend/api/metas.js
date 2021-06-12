var moment = require('moment');

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

        if (req.user.ong) {
            if (metas.id && req.user.id == metas.userId) {
                app.db('doacoes_com_metas')
                    .update({ titulo: metas.titulo, descricao: metas.descricao, imageUrl: metas.imageUrl, valorEsperado: metas.valorEsperado, valorAtual: metas.valorAtual })
                    .where({ id: metas.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else {
                app.db('doacoes_com_metas')
                    .insert({ titulo: metas.titulo, descricao: metas.descricao, imageUrl: metas.imageUrl, valorEsperado: metas.valorEsperado, valorAtual: 0, userId: req.user.id, createdAt: new Date() })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } else {
            res.status(401).send("Você não tem autorização! Não tente novamente!")
        }
    }

    const remove = async (req, res) => {

        const metasFromDB = await app.db('doacoes_com_metas')
            .where({ id: req.params.id }).first()

        if(req.user.id == metasFromDB.userId){
            try {
                const rowsDeleted = await app.db('doacoes_com_metas')
                    .where({ id: req.params.id }).del()
    
                try {
                    existsOrError(rowsDeleted, 'Meta não encontrada.')
                } catch (msg) {
                    return res.status(400).send(msg)
                }
    
                res.status(204).send()
            } catch (msg) {
                res.status(500).send(msg)
            }
        }else{
            res.status(401).send("Você não tem autorização! Não tente novamente!")
        }
    }

    const getByUser = async (req, res) => {

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
            .join('users', 'doacoes_com_metas.userId', 'users.id')
            .select('doacoes_com_metas.id', 'doacoes_com_metas.titulo', 'doacoes_com_metas.imageUrl', 'doacoes_com_metas.valorEsperado', 'doacoes_com_metas.valorAtual',
                'doacoes_com_metas.userId', 'doacoes_com_metas.createdAt', 'users.name', 'users.email', 'users.userImage')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(metas => res.json({ data: metas, count, limit }))
            .catch(err => res.status(500).send(err))

    }

    const getById = (req, res) => {
        app.db('doacoes_com_metas')
            .join('users', 'doacoes_com_metas.userId', 'users.id')
            .select('doacoes_com_metas.id', 'doacoes_com_metas.titulo', 'doacoes_com_metas.imageUrl', 'doacoes_com_metas.valorEsperado', 'doacoes_com_metas.valorAtual',
                'doacoes_com_metas.userId', 'doacoes_com_metas.descricao', 'doacoes_com_metas.createdAt', 'users.name', 'users.email', 'users.userImage')
            .where({ 'doacoes_com_metas.id': req.params.id })
            .first()
            .then(metas => {
                metas.descricao = metas.descricao.toString()
                return res.json(metas)
            })
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById, getByUser }
}