
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const tag = { ...req.body }
        if (req.params.id) tag.id = req.params.id

        try {
            existsOrError(tag.nome_tag, 'Informe o nome da TAG')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (tag.id) {
            app.db('ongs_tags')
                .update(tag)
                .where({ id: tag.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {

            tag.userId = req.user.id;

            app.db('ongs_tags')
                .insert(tag)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('ongs_tags')
                .where({ id: req.params.id }).del()

            try {
                existsOrError(rowsDeleted, 'Não foi possível encontrar a TAG informada')
            } catch (msg) {
                return res.status(400).send(msg)
            }

            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const get = async (req, res) => {
        app.db('ongs_tags')
            .where({ userId: req.user.id })
            .then(tag => res.json(tag))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('ongs_tags')
            .where({ id: req.params.id })
            .first()
            .then(tag => res.json(tag))
            .catch(err => res.status(500).send(err))
    }

    const getByUser = async (req, res) => {
        app.db('ongs_tags')
            .where({ userId: req.params.id })
            .then(tag => res.json(tag))
            .catch(err => res.status(500).send(err))
    }



    return { save, remove, get, getById, getByUser }
}