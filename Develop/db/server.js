const express = require('express')

const PORT = 3002

const app = express()

app.get('/', (req, res) => {
    res.json(``)
})

app.listen(PORT, () => {
    console.log(`Expree sever listening on port ${PORT}!`)
})