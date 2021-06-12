
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const objetivos = { ...req.body }
        if (req.params.id) objetivos.id = req.params.id

        try {
            existsOrError(objetivos.titulo, 'Título não informado')
            existsOrError(objetivos.descricao, 'Descrição não informado')
            existsOrError(objetivos.valor, 'Valor não informado')
            existsOrError(objetivos.metasId, 'Metas não informado')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if(req.user.ong){
            if (objetivos.id && req.user.id == objetivos.userId) {
                app.db('doacoes_com_metas_objetivos')
                    .update({ titulo: objetivos.titulo, descricao: objetivos.descricao, valor: objetivos.valor, metasId: objetivos.metasId })
                    .where({ id: objetivos.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            } else {
                app.db('doacoes_com_metas_objetivos')
                    .insert({ titulo: objetivos.titulo, descricao: objetivos.descricao, valor: objetivos.valor, metasId: objetivos.metasId, userId: req.user.id })
                    .then(_ => res.status(204).send())
                    .catch(err => res.status(500).send(err))
            }
        }else{
            res.status(401).send("Você não tem autorização! Não tente novamente!")
        }
    }

    const remove = async (req, res) => {
        const objetivosFromDB = await app.db('doacoes_com_metas_objetivos')
            .where({ id: req.params.id }).first()

        if(req.user.id == objetivosFromDB.userId){
            try {
                const rowsDeleted = await app.db('doacoes_com_metas_objetivos')
                    .where({ id: req.params.id }).del()
    
                try {
                    existsOrError(rowsDeleted, 'Objetivo não encontrado')
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

        app.db('doacoes_com_metas_objetivos')
            .where({ userId: req.user.id })
            .then(objetivos => res.json(objetivos))
            .catch(err => res.status(500).send(err))
    }


    const get = async (req, res) => {

        app.db('doacoes_com_metas_objetivos')
            .select('id', 'titulo', 'valor', 'descricao', 'metasId')
            .where({ metasId: req.params.id })
            .then(objetivos => res.json(objetivos))
            .catch(err => res.status(500).send(err))

    }

    const getById = (req, res) => {
        app.db('doacoes_com_metas_objetivos')
            .select('id', 'titulo', 'valor', 'descricao', 'metasId', 'userId')
            .where({ id: req.params.id })
            .first()
            .then(objetivos => res.json(objetivos))
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById, getByUser }
}