require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const People = require('./models/person')

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use(express.static('build'))


app.get('/api/persons', (req, res, next) => {
  People.find()
    .then(people => {
      res.json(people)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  People.findById({ _id: id })
    .then(response => {
      res.json(response)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body

  const people = {
    name,
    number
  }

  People.findByIdAndUpdate({ _id: id }, people)
    .then(() => {
      res.json(people)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) return res.status(400).send({ msg: 'The name or number is missing ' })

  const people = new People({
    name,
    number
  })

  people
    .save()
    .then(response => res.json(response.toJSON()))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params
  await People.findByIdAndDelete({ _id: id })
    .then(response => res.json({ msg: `${response.name} Deleted` }))
    .catch(error => next(error))

})

app.get('/info', (req, res) => {
  People.find({})
    .then(peoples => {
      res.send(
        `<div>
        <span>Phonebook has info for ${peoples.length} peoples. <br/> <br/><span/><div/> <span>${new Date()}<span/>`)

    })
})

const errorHandler = (error, request, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


app.listen(PORT, () => {
  console.log('ta rodando')
})