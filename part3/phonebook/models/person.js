const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const URL = process.env.MONGODB_URI


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const peopleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique:true, minlength: 3},
  number: { type: String, required: true, minlength: 8}
})

peopleSchema.plugin(uniqueValidator)


peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('People', peopleSchema)
