module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const bio = { ...req.body }
        if (req.params.id) bio.id = req.params.id

        try {
            existsOrError(bio.descricao, 'Descrição não informada')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (req.user.ong) {
            if (bio.id) {

                app.db('ong_bio')
                    .update(bio)
                    .where({ id: bio.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else {
                bio.userId = req.user.id;
                app.db('ong_bio')
                    .insert(bio)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        } else {
            res.status(401).send("Você não tem autorização! Não tente novamente!")
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


    return { save, getById, getByUser }
}