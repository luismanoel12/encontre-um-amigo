
module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const getCountLastWeek = async (req, res) => {

        var today = new Date();
        var lastweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

        const usersWeek = await app.db('users').whereBetween('createdAt', [lastweek, today]).count('id').first()
        const usersWeekCount = parseInt(usersWeek.count)


        app.db('users')
            .where({ 'id': 0 })
            .then(count => res.json({
                data: count, usersWeekCount
            }))
            .catch(err => res.status(500).send(err))
    }

    return { getCountLastWeek }
}