
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


            // const qtdObjetivos = await app.db('doacoes_com_metas_objetivos')
            //     .where({ metasId: objetivos.metasId }).count('metasId')
            // const count = parseInt(qtdObjetivos[0].count)

            // console.log(count)

            // if (count >= 5) {
            //     notExistsOrError(qtdObjetivos, 'Você só pode cadastrar 5 objetivos por barra de doações!')
            // }

        } catch (msg) {
            res.status(400).send(msg)
        }


        if (objetivos.id) {
            app.db('doacoes_com_metas_objetivos')
                .update({ titulo: objetivos.titulo, descricao: objetivos.descricao, valor: objetivos.valor, metasId: objetivos.metasId })
                .where({ id: objetivos.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('doacoes_com_metas_objetivos')
                .insert({ titulo: objetivos.titulo, descricao: objetivos.descricao, valor: objetivos.valor, metasId: objetivos.metasId })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
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
    }


    const get = async (req, res) => {

        app.db('doacoes_com_metas_objetivos')
            .select('titulo', 'valor', 'descricao', 'metasId')
            .where({ metasId: req.params.id })
            .then(objetivos => res.json(objetivos))
            .catch(err => res.status(500).send(err))

    }

    const getById = (req, res) => {
        app.db('doacoes_com_metas_objetivos')
            .where({ id: req.params.id })
            .first()
            .then(objetivos => res.json(objetivos))
            .catch(err => res.status(500).send(err))
    }


    return { save, remove, get, getById }
}