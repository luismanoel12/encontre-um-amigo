
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

        const admins = await app.db('users').where({ 'admin': true }).count('id').first()
        const adminsCount = parseInt(admins.count)

        const tutores = await app.db('users').where({ 'ong': false }).andWhere({ 'admin': false }).count('id').first()
        const tutoresCount = parseInt(tutores.count)

        app.db('users')
        .where({ 'id': 0 })
        .then(count => res.json({ data: count, usersCount, ongsCount, publicacoesCount, animaisCount, metasCount, adminsCount, tutoresCount }))
        .catch(err => res.status(500).send(err))
    }

    return { getCount }
}