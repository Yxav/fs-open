const mongoose = require('mongoose')

// console.log(process.argv[3])
// console.log(process.argv[4])

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://ad:${password}@project.nznhe.mongodb.net/phoneBookFS?retryWrites=true&w=majority`

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String
})

const People = mongoose.model('People', peopleSchema)

if (process.argv.length === 3) {
  People.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(people => {
      console.log(`${people.name} ${people.number}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length >= 4) {

  const people = new People({
    name: process.argv[3],
    number: process.argv[4]
  })

  people.save()
    .then(result => {
      console.log(result)
      mongoose.connection.close()
    })
}


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

