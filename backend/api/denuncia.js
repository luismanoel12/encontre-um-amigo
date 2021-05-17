module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const denuncia = { ...req.body }
        if(req.params.id) denuncia.id = req.params.id

        try{
            existsOrError(denuncia.tipoDenuncia, 'O tipo da denúncia não foi informado')
            existsOrError(denuncia.descricao, 'A descrição da denúncia não foi informada')

        } catch(msg){
            res.status(400).send(msg)
        }

        if(denuncia.id){
            app.db('denuncia')
                .update(denuncia)
                .where({ id: denuncia.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {

            denuncia.status = "Aberto"
            denuncia.createdAt = new Date();

            app.db('denuncia')
                .insert(denuncia)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
       try {
           const rowsDeleted = await app.db('denuncia')
            .where({ id: req.params.id}).del()
           notExistsOrError(rowsDeleted, "A sua denuncia nunca existiu no nosso sistema")
           
           res.status(204).send()       
        
        }catch(msg) {
            res.status(500).send(msg)
        }
    }

    const get = (req, res) => { 
       app.db('denuncia')
            .then(denuncia => res.json(denuncia))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('denuncia')
        .where({ id: req.params.id })
        .first()
        .then(denuncia => res.json(denuncia))
        .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById }
}