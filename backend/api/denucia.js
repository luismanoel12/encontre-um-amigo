module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const denucia = { ...req.body }
        if(req.params.id) publish.id = req.params.id

        try{
            existsOrError(denucia.titulo, 'Titulo não foi informado')
            existsOrError(denucia.imageUrl, 'O Link não foi informado')
            existsOrError(denucia.descricao, 'Descirção não informada')

        } catch(msg){
            res.status(400).send(msg)
        }

        if(denucia.id){
            app.db('denucia')
                .update(denucia)
                .where({ id: denucia.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('denucia')
                .insert({tipo: denucia.tipo, status: denucia.status, descricao: publicacao.descricao, userId: req.user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
       try {
           const rowsDeleted = await app.db('denucia')
            .where({ id: req.params.id}).del()
           notExistsOrError(rowsDeleted, "A sua Denucia nunca existiu no nosso sistema")
           
           res.status(204).send()       
        
        }catch(msg) {
            res.status(500).send(msg)
        }
    }
    const get = async (req, res) => {
       const page = req.query.page || 1
       const result = await app.db('denucia').count('id').first
       const count = parseInt(result.count)
       
       app.db('denucia')
            .select('id','tipo','status','descricao')
            .then(denucia => res.json(denucia))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('denucia')
            .where({ id: req.params.id })
            .first()
            .then(denucia => {
                denucia.content = denucia.content.toString()
                return res.json(denucia)
            })
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById }
}