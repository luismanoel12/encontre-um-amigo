
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const getCountLastWeek = async (req, res) => {

        var today = new Date();
        var lastweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

        const usersWeek = await app.db('users').whereBetween('createdAt', [lastweek, today]).count('id').first()
        const usersWeekCount = parseInt(usersWeek.count)

        const ongsWeek = await app.db('users').whereBetween('createdAt', [lastweek, today]).where({ 'ong': true }).count('id').first()
        const ongsCountWeek = parseInt(ongsWeek.count)

        const publicacoesWeek = await app.db('publicacao').whereBetween('createdAt', [lastweek, today]).count('id').first()
        const publicacoesCountWeek = parseInt(publicacoesWeek.count)

        const animaisWeek = await app.db('animais').whereBetween('createdAt', [lastweek, today]).count('id').first()
        const animaisCountWeek = parseInt(animaisWeek.count)

        const metasWeek = await app.db('doacoes_com_metas').whereBetween('createdAt', [lastweek, today]).count('id').first()
        const metasCountWeek = parseInt(metasWeek.count)

        const denunciasWeek = await app.db('denuncia').whereBetween('createdAt', [lastweek, today]).count('id').first()
        const denunciasCountWeek = parseInt(denunciasWeek.count)

        app.db('users')
            .where({ 'id': 0 })
            .then(count => res.json({
                data: count, usersWeekCount, ongsCountWeek, publicacoesCountWeek, animaisCountWeek, metasCountWeek, denunciasCountWeek
            }))
            .catch(err => res.status(500).send(err))
    }

    return { getCountLastWeek }
}