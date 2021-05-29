module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const bio = { ...req.body }
        if (req.params.id) bio.id = req.params.id

        try {
            existsOrError(bio.descricao, 'Descrição não informada')

        } catch (msg) {
            res.status(400).send(msg)
        }


        bio.userId = req.user.id;

        if (bio.id) {
            app.db('ong_bio')
                .update(bio)
                .where({ id: bio.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('ong_bio')
                .insert(bio)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('ong_bio')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Essa Bio não foi encontrado')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const getByUser = async (req, res) => {

        app.db('ong_bio')
            .where({ userId: req.user.id })
            .first()
            .then(bio => {
                bio.descricao = bio.descricao.toString()
                return res.json(bio)
            })
            .catch(err => res.status(500).send(err))
    }


    const get = (req, res) => {
        app.db('denuncia')
            .then(denuncia => res.json(denuncia))
            .catch(err => res.status(500).send(err))
    }


    const getById = (req, res) => {
        app.db('ong_bio')
            .where({ userId: req.params.id })
            .first()
            .then(bio => {
                bio.descricao = bio.descricao.toString()
                return res.json(bio)
            })
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, getById, get, getByUser }
}