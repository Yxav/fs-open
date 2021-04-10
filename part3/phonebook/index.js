require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const People = require('./models/person')

const PORT = process.env.PORT || 3001

const app = express()

const generateId = () => Math.floor(Math.random() * 12458754)

const data = new Date()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('build'))

app.get('/api/persons', async (req, res, next) => {
  await People.find()
    .then(people=>{
      res.json(people)
    })
    .catch(error=>next(error))
})

app.get('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params
  await People.findById({ _id: id })
    .then(response => {
        res.json(response)
    })
    .catch(error=>next(error))
})

app.put('/api/persons/:id', async (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body

  const people = {
    name,
    number
  }

  await People.findByIdAndUpdate({_id: id}, people)
    .then((response) => {
      res.json(people)
    })
    .catch(error=>next(error))
})


app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body

  if (!name || !number) return res.status(400).send({ msg: 'The name or number is missing ' })

  const persons = await People.find()
  const filterPeople = persons.filter(person => person.name === name)

  if (filterPeople.length > 0) return res.status(400).send({ msg: 'The name already exists in the phonebook ' })


  const people = new People({
    id: generateId(),
    name,
    number
  })
  await people.save()
    .then(response => res.json(response))
    .catch(error=>next(error))


})

app.delete('/api/persons/:id', async (req, res) => {
  const { id } = req.params
  await People.findByIdAndDelete({ _id: id })
  .then(response => res.json({ msg: `${response.name} Deleted` }))
  .catch(error=>next(error))
  
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${peoples.length} peoples. <br/> <br/> ${data}`)
})


app.listen(PORT, () => {
  console.log('ta rodando')
})