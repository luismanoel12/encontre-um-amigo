const admin = require('./admin')
const owner = require('./owner')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    // User routes

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(owner(app.api.user.get))

    app.route('/user-name/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getName)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(owner(app.api.user.save))
        .get(owner(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/setAdmin/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.setAdmin))

    // Rota das Ongs

    app.route('/ongs')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getOngs)

    app.route('/ongs/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getOngById)


    // Carousel routes

    app.route('/carousel')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.carousel.save))
        .get(app.api.carousel.get)

    app.route('/carousel/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.carousel.save))
        .get(admin(app.api.carousel.getById))
        .delete(admin(app.api.carousel.remove))

    // Doações com metas
    app.route('/metas')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.metas.save))
        .get(app.api.metas.get)


    app.route('/metasUsuario')
        .all(app.config.passport.authenticate())
        .get(app.api.metas.getPorUsuario)

    app.route('/metas/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.metas.save))
        .get(app.api.metas.getById)
        .delete(admin(app.api.metas.remove))

    // Doações com metas - Objetivos 

    app.route('/objetivos')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.objetivos.save))
        .put(admin(app.api.objetivos.save))

    app.route('/objetivosMeta/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.objetivos.get)

    app.route('/objetivos/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.objetivos.save))
        .get(app.api.objetivos.getById)
        .delete(admin(app.api.objetivos.remove))

    app.route('/objetivosUsuario/:id')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.objetivos.save))
        .get(app.api.objetivos.getPorUsuario)


    // Cadastro de animais e listagem

    app.route('/animais')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.animais.save))
        .get(app.api.animais.get)
        .put(admin(app.api.animais.save))

    app.route('/animaisUsuario')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.animais.save))
        .get(app.api.animais.getPorUsuario)

    app.route('/animais/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.animais.save))
        .get(app.api.animais.getById)
        .delete(admin(app.api.animais.remove))


    // Cadastro de publicações e listagem

    app.route('/publicacao')
        .all(app.config.passport.authenticate())
        .post(app.api.publicacao.save)
        .get(app.api.publicacao.get)
        .put(admin(app.api.publicacao.save))

    app.route('/publicacaoUsuario')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.publicacao.save))
        .get(app.api.publicacao.getPorUsuario)

    app.route('/ultimasPublicacoes/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.publicacao.getUltimasPublicacoes)

    app.route('/publicacao/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.publicacao.save))
        .get(app.api.publicacao.getById)
        .delete(admin(app.api.publicacao.remove))

}