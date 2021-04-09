const express = require('express')
const morgan = require('morgan')
const app = express()


let peoples = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
  }
]

const generateId = () => Math.floor(Math.random() * 12458754)

const data = new Date()


app.use(express.json())
app.use(morgan('tiny'))

app.get('/api/persons', (req, res) => {
  res.json(peoples)
})

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params
  const people = peoples.find(people => people.id === parseInt(id))
  if (people) return res.json(people)
  res.json({ msg: 'Does not have persons with id' })
})
app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if(!name || !number) return res.status(400).send({msg: 'The name or number is missing '})

  const filterPeople = peoples.filter(people => people.name === name) 

  if(filterPeople.length > 0) return res.status(400).send({msg: 'The name already exists in the phonebook '})

  
 
  const people = {
    id: generateId(),
    name, 
    number
  }
  peoples.push(people)
  res.send(people)
})

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params
  peoples = peoples.filter(people => people.id !== parseInt(id))
  res.json({ msg: 'Deleted' })
})

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${peoples.length} peoples. <br/> <br/> ${data}`)
})


app.listen(3001, () => {
  console.log('ta rodando')
})