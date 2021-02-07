
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const carousel = { ...req.body }
        if(req.params.id) carousel.id = req.params.id

        try{
            existsOrError(carousel.author, 'Nome do responsavel não informado')
            existsOrError(carousel.link, 'Link não informado')

        } catch(msg){
            res.status(400).send(msg)
        }

        if(carousel.id){
            app.db('carousel')
                .update(carousel)
                .where({ id: carousel.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('carousel')
                .insert(carousel)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('carousel')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Carousel não encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const get = async (req, res) => {
        app.db('carousel')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('carousel')
            .where({ id: req.params.id })
            .first()
            .then(carousel => res.json(carousel))
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById }
}