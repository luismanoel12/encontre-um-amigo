
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const doacoes = { ...req.body }
        if(req.params.id) doacoes.id = req.params.id

        try{
            existsOrError(doacoes.meio_pagamento, 'Nome do meio de pagamento não informado')
            existsOrError(doacoes.descricao, 'Nenhuma descrição foi informada')

        } catch(msg){
            res.status(400).send(msg)
        }

        if(doacoes.id){
            app.db('doacoes')
                .update(doacoes)
                .where({ id: doacoes.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('doacoes')
                .insert(doacoes)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('doacoes')
                .where({ id: req.params.id }).del()
            
            try {
                existsOrError(rowsDeleted, 'Não foi possivel encontrar o meio de doação informado')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const get = async (req, res) => {
        app.db('doacoes')
            .then(doacoes => res.json(doacoes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('doacoes')
            .where({ id: req.params.id })
            .first()
            .then(doacoes => res.json(doacoes))
            .catch(err => res.status(500).send(err))
    }

    const getByUser = async (req, res) => {
        app.db('doacoes')
            .where({ userId: req.user.id })
            .then(doacoes => res.json(doacoes))
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById, getByUser }
}