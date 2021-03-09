module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const animais = { ...req.body }
        if(req.params.id) animais.id = req.params.id
    }
}