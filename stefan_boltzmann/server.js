var express = require('express')
var app = express()
var port = 60010

app.use('/',express.static('.'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))