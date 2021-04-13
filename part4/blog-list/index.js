const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./config')

const blogController = require('./controllers/blogs')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', blogController.index)

app.post('/api/blogs', blogController.store)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})