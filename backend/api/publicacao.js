
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const publicacao = { ...req.body }
        if(req.params.id) publish.id = req.params.id

        try{
            existsOrError(publicacao.titulo, 'Titulo não foi informado')
            existsOrError(publicacao.imageUrl, 'O Link não foi informado')
            existsOrError(publicacao.descricao, 'Descirção não informada')

        } catch(msg){
            res.status(400).send(msg)
        }

        if(publicacao.id){
            app.db('publicacao')
                .update(publicacao)
                .where({ id: publicacao.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('publicacao')
                .insert(publicacao)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
       try {
           const rowsDeleted = await app.db('publicacao')
            .where({ id: req.params.id}).del()
           notExistsOrError(rowsDeleted, "A sua Publicação não foi encontrada")
           
           res.status(204).send()       
        
        }catch(msg) {
            res.status(500).send(msg)
        }
    }
    const limit = 10
    const get = async (req, res) => {
       const page = req.query.page || 1
       const result = await app.db('publicacao').count('id').first
       const count = parseInt(result.count)
       
       app.db('publicacao')
            .select('id','titulo','descricao')
            .limit(limit).offset(page * limit - limit)
            .then(publicacao => res.json({data: publicacao, count, limit}))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('publicacao')
            .where({ id: req.params.id })
            .first()
            .then(publicacao => {
                publicacao.content = publicacao.content.toString()
                return res.json(publicacao)
            })
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById }
}