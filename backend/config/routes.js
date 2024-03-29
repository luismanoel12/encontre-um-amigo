const admin = require('./admin')
const owner = require('./owner')

module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)


    // Public routes

    app.get('/carouselPublic', app.api.carousel.get)


    app.get('/ongs', app.api.user.getOngs)
    app.get('/ongs/:id', app.api.user.getOngById)
    app.get('/bioById/:id', app.api.bio.getById)
    app.post('/ongsSearch', app.api.user.getOngsSearch)

    app.get('/metasPublic', app.api.metas.get)
    app.get('/metasPublic/:id', app.api.metas.getById)
    app.get('/objetivosMetaPublic/:id', app.api.objetivos.get)

    app.get('/animaisPublic', app.api.animais.get)
    app.get('/animaisPublic/:id', app.api.animais.getById)
    app.get('/allByUser/:id', app.api.animais.getAllByUser)
    app.get('/animaisDesaparecidos', app.api.animais.getLost)
    app.get('/animaisDesaparecidos/:id', app.api.animais.getLostById)
    app.post('/animaisSearch', app.api.animais.getCustomSearch)
    app.post('/animaisDesaparecidosSearch', app.api.animais.getCustomSearchLost)

    app.get('/publicacaoPublic', app.api.publicacao.get)
    app.get('/publicacaoPublic/:id', app.api.publicacao.getById)
    app.get('/ultimasPublicacoes/:id', app.api.publicacao.getLatestPublications)

    app.get('/doacoesByUser/:id', app.api.doacoes.getByUser)
    app.get('/getOngTags/:id', app.api.tags.getByUser)

    app.get('/getRandom', app.api.animais.getRandom)

    app.post('/searchUsers', app.api.user.searchUser)




    // User routes

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(owner(app.api.user.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(owner(app.api.user.save))
        .get(owner(app.api.user.getById))
        .delete(admin(app.api.user.remove))

    app.route('/newPassword')
        .all(app.config.passport.authenticate())
        .put(owner(app.api.user.newPassword))

    app.route('/setAdmin/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.setAdmin))

    app.route('/getAdmins')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.user.getAdmins))


    // Carousel routes

    app.route('/carousel')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.carousel.save))
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
        .post(app.api.metas.save)
        .get(app.api.metas.get)

    app.route('/metasUsuario')
        .all(app.config.passport.authenticate())
        .get(app.api.metas.getByUser)

    app.route('/metas/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.metas.save)
        .get(app.api.metas.getById)
        .delete(app.api.metas.remove)

    // Doações com metas - Objetivos 

    app.route('/objetivos')
        .all(app.config.passport.authenticate())
        .post(app.api.objetivos.save)
        .put(app.api.objetivos.save)

    // app.route('/objetivosMeta/:id')
    //     .all(app.config.passport.authenticate())
    //     .get(app.api.objetivos.get)

    app.route('/objetivos/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.objetivos.save)
        .get(app.api.objetivos.getById)
        .delete(app.api.objetivos.remove)

    app.route('/objetivosUsuario/:id')
        .all(app.config.passport.authenticate())
        .post(app.api.objetivos.save)
        .get(app.api.objetivos.getByUser)


    // Cadastro de animais e listagem

    app.route('/animais')
        .all(app.config.passport.authenticate())
        .post(app.api.animais.save)
        .get(app.api.animais.get)
        .put(app.api.animais.save)

    app.route('/animaisUsuario')
        .all(app.config.passport.authenticate())
        .post(app.api.animais.save)
        .get(app.api.animais.getByUser)

    app.route('/animais/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.animais.save)
        .get(app.api.animais.getById)
        .delete(app.api.animais.remove)

    app.route('/animais/adotar/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.animais.adopt)


    // Cadastro de publicações e listagem

    app.route('/publicacao')
        .all(app.config.passport.authenticate())
        .post(app.api.publicacao.save)
        .get(app.api.publicacao.get)
        .put(app.api.publicacao.save)

    app.route('/publicacaoUsuario')
        .all(app.config.passport.authenticate())
        .post(app.api.publicacao.save)
        .get(app.api.publicacao.getByUser)


    app.route('/publicacao/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.publicacao.save)
        .get(app.api.publicacao.getById)
        .delete(app.api.publicacao.remove)


    // Dashboard

    app.route('/getCount')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.count.getCount))

    app.route('/getCountLastWeek')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.countLastWeek.getCountLastWeek))

    // Denúncia

    app.route('/denuncia')
        .all(app.config.passport.authenticate())
        .post(app.api.denuncia.save)
        .get(admin(app.api.denuncia.get))
        .put(admin(app.api.denuncia.save))

    app.route('/denuncia/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.denuncia.save))
        .get(admin(app.api.denuncia.getById))
        .delete(admin(app.api.denuncia.remove))

    // Ong bio

    app.route('/ongBio')
        .all(app.config.passport.authenticate())
        .post(app.api.bio.save)
        .get(app.api.bio.getByUser)
        .put(app.api.bio.save)


    // Doações

    app.route('/doacoes')
        .all(app.config.passport.authenticate())
        .post(app.api.doacoes.save)
        .get(app.api.doacoes.get)

    app.route('/doacoes/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.doacoes.save)
        .get(app.api.doacoes.getById)
        .delete(app.api.doacoes.remove)


    // TAGS


    app.route('/tags')
        .all(app.config.passport.authenticate())
        .post(app.api.tags.save)
        .get(app.api.tags.get)

    app.route('/tags/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.tags.save)
        .get(app.api.tags.getById)
        .delete(app.api.tags.remove)

}