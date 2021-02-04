const { raw } = require("body-parser")

module.exports = middleware => {

    return (req, res, next) => {
        if(req.user.id == req.params.id || req.user.admin === true){
            middleware(req, res, next)
        }else {
            res.status(401).send("Usuário não tem autorização ou não é um administrador")
        }

    }
}