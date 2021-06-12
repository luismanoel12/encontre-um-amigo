
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const doacoes = { ...req.body }
        if (req.params.id) doacoes.id = req.params.id

        try {
            existsOrError(doacoes.meio_pagamento, 'Nome do meio de pagamento não informado')
            existsOrError(doacoes.descricao, 'Nenhuma descrição foi informada')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if(req.user.ong){
            if (doacoes.id && doacoes.userId == req.user.id) {
                app.db('doacoes')
                    .update(doacoes)
                    .where({ id: doacoes.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else {
    
                doacoes.userId = req.user.id;
                app.db('doacoes')
                    .insert(doacoes)
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        }else{
            res.status(401).send("Você não tem autorização! Não tente novamente!")
        }
    }

    const remove = async (req, res) => {

        const doacaoFromDB = await app.db('doacoes')
            .where({ id: req.params.id }).first()
           

        if(req.user.id == doacaoFromDB.userId){
            try {
                const rowsDeleted = await app.db('doacoes')
                    .where({ id: req.params.id }).del()
    
                try {
                    existsOrError(rowsDeleted, 'Não foi possivel encontrar o meio de doação informado')
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

    const get = async (req, res) => {
        app.db('doacoes')
            .where({ userId: req.user.id })
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
            .where({ userId: req.params.id })
            .then(doacoes => res.json(doacoes))
            .catch(err => res.status(500).send(err))
    }



    return { save, remove, get, getById, getByUser }
}