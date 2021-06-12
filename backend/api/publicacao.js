var moment = require('moment');

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const publicacao = { ...req.body }
        if (req.params.id) publicacao.id = req.params.id

        try {
            existsOrError(publicacao.titulo, 'Titulo não foi informado')
            existsOrError(publicacao.descricao, 'Descrição não informada')

        } catch (msg) {
            res.status(400).send(msg)
        }


        if (req.user.admin || req.user.ong) {
            if (publicacao.id && publicacao.userId == req.user.id) {
                app.db('publicacao')
                    .update({ titulo: publicacao.titulo, imageUrl: publicacao.imageUrl, chamada: publicacao.chamada, descricao: publicacao.descricao })
                    .where({ id: publicacao.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))

            } else {

                publicacao.userId = req.user.id;
                publicacao.createdAt = new Date();
                publicacao.dataPub = moment().locale('pt-br').format('LLLL');

                app.db('publicacao')
                    .insert(publicacao)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } else {
            res.status(401).send("Você não tem autorização! Não tente novamente!")
        }
    }

    const remove = async (req, res) => {
        const publicacaoFromDB = await app.db('publicacao')
            .where({ id: req.params.id }).first()

        if (req.user.id == publicacaoFromDB.userId) {
            try {
                const rowsDeleted = await app.db('publicacao')
                    .where({ id: req.params.id }).del()

                try {
                    existsOrError(rowsDeleted, 'Essa publicação não foi encontrado')
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

        app.db('publicacao')
            .where({ userId: req.user.id })
            .then(publicacao => res.json(publicacao))
            .catch(err => res.status(500).send(err))
    }

    const getLatestPublications = async (req, res) => {

        app.db('publicacao')
            .join('users', 'publicacao.userId', 'users.id')
            .select('publicacao.id', 'publicacao.titulo', 'publicacao.descricao', 'publicacao.chamada', 'publicacao.imageUrl',
                'publicacao.createdAt', 'publicacao.dataPub', 'publicacao.userId', 'users.email', 'users.name', 'users.userImage')
            .limit(5)
            .orderBy('id', 'desc')
            .where({ userId: req.params.id })
            .then(publicacao => res.json(publicacao))
            .catch(err => res.status(500).send(err))
    }

    const limit = 6
    const get = async (req, res) => {
        const page = req.query.page || 1
        const result = await app.db('publicacao').count('id').first()
        const count = parseInt(result.count)


        app.db('publicacao')
            .join('users', 'publicacao.userId', 'users.id')
            .select('publicacao.id', 'publicacao.titulo', 'publicacao.descricao', 'publicacao.chamada', 'publicacao.imageUrl',
                'publicacao.createdAt', 'publicacao.dataPub', 'publicacao.userId', 'users.email', 'users.name', 'users.userImage')
            .orderBy('id', 'desc')
            .limit(limit).offset(page * limit - limit)
            .then(publicacao => res.json({ data: publicacao, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('publicacao')
            .join('users', 'publicacao.userId', 'users.id')
            .select('publicacao.id', 'publicacao.titulo', 'publicacao.descricao', 'publicacao.chamada', 'publicacao.imageUrl',
                'publicacao.createdAt', 'publicacao.dataPub', 'publicacao.userId', 'users.email', 'users.name', 'users.userImage')
            .where({ 'publicacao.id': req.params.id })
            .first()
            .then(publicacao => {
                publicacao.descricao = publicacao.descricao.toString()
                return res.json(publicacao)
            })
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById, getByUser, getLatestPublications }
}