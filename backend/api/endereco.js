
module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation


    const save = async (req, res) => {
        const user = { ...req.body }
        const endereco = { ...req.body }
        if(req.params.id) endereco.id = req.params.id

        if(!req.originalUrl.startsWith('/endereco')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try {

            existsOrError(endereco.endereco, 'Endereço não informado')
            existsOrError(endereco.numero, 'Número não informado')
            existsOrError(endereco.bairro, 'Bairro não informado')
            existsOrError(endereco.estado, 'Estado não informado')
            existsOrError(endereco.cidade, 'Cidade não informado')
            existsOrError(endereco.cep, 'CEP não informado')

        }catch(msg){
            return res.status(400).send(msg)
        }


        if(endereco.id){
            app.db('endereco')
                .update(endereco)
                .where({ userId: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('endereco')
                .insert(endereco)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('endereco')
            .select('id', 'endereco', 'numero', 'complemento', 'bairro', 'estado', 'cidade', 'cep', 'userId')
            .whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('endereco')
            .select('id', 'endereco', 'numero', 'complemento', 'bairro', 'estado', 'cidade', 'cep', 'userId')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(endereco => res.json(endereco))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try{
            const rowsUpdated = await app.db('users')
                .update({ deletedAt: new Date() })
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}