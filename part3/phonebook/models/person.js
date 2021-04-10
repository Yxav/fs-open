const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const URL = process.env.MONGODB_URI


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const peopleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true },
  number: { type: String, required: true }
})

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

peopleSchema.plugin(uniqueValidator)

module.exports = mongoose.model('People', peopleSchema)
