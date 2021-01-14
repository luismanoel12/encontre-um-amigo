const admin = require('./admin')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)        
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/complete', app.api.endereco.save)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove)) 

    app.route('/endereco')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.endereco.save))
        .get(admin(app.api.endereco.get))

    app.route('/endereco/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.endereco.save))
        .get(admin(app.api.endereco.getById))
        .delete(admin(app.api.endereco.remove)) 
}