const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json({limit: '10mb', extended: true}))
    app.use(cors())
}