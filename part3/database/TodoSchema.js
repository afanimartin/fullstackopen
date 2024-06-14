import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()
mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const todoSchema = new mongoose.Schema({
  content: String,
  isComplete: Boolean
})

todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Todo = mongoose.model("Todo", todoSchema)

export default Todo;