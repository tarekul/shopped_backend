const pgp = require('pg-promise')({})
const db = pgp('postgress://localhost/shopped')

module.exports = db