
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const getCount = async (req, res) => {

        const users = await app.db('users').count('id').first()
        const usersCount = parseInt(users.count)

        const ongs = await app.db('users').where({ 'ong': true }).count('id').first()
        const ongsCount = parseInt(ongs.count)

        const publicacoes = await app.db('publicacao').count('id').first()
        const publicacoesCount = parseInt(publicacoes.count)

        const animais = await app.db('animais').count('id').first()
        const animaisCount = parseInt(animais.count)

        const metas = await app.db('doacoes_com_metas').count('id').first()
        const metasCount = parseInt(metas.count)

        // const u = await app.db('users').count('id').first()
        // const users = parseInt(u.count)

        // const u = await app.db('users').count('id').first()
        // const users = parseInt(u.count)

        app.db('carousel')
        .then(count => res.json({ data: count, usersCount, ongsCount, publicacoesCount, animaisCount, metasCount }))
        .catch(err => res.status(500).send(err))
    }

    return { getCount }
}