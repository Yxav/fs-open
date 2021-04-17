const express = require('express')
const app = express()
const cors = require('cors')

const blogController = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', blogController.index)

app.post('/api/blogs', blogController.store)

app.put('/api/blogs/:id', blogController.update)

app.delete('/api/blogs/:id', blogController.destroy)


module.exports = app