import express from 'express'
const app = express()
const port = process.env.PORT
import mongoose, { Schema } from 'mongoose';
import 'dotenv/config'
app.use(express.json())
import cors from 'cors'
app.use(cors())


app.get('/', async (req, res) => {
    try {
        const blogs = await BlogModel.find({})
        res.send(blogs)
    } catch (error) {
        res.send(error.message)
    } 
  })
  
  app.post('/', async (req, res) => {
    const {image,name,about} = req.body
    try {
        const blogs = new BlogModel({image,name,about})
        await blogs.save()
        res.send(blogs)
    } catch (error) {
        res.send(error.message)
    }
  })
  
  app.put('/:id', async (req, res) => {
    const {id} = req.params
    const {image,name,about} = req.body
    try {
        const blogs = await BlogModel.findByIdAndUpdate(id, {image,name,about} )
        res.send(blogs)
    } catch (error) {
        res.send(error.message)
    }
  })
  
  app.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const blogs = await BlogModel.findByIdAndDelete(id)
        res.send(blogs)
    } catch (error) {
        res.send(error.message)
    }
  })

  mongoose.connect(process.env.DB_SECRET_KEY)
  .then(() => console.log('Connected!'));

  const blogSchema = new Schema({
    image: String,
    name: String,
    about: String,
  })

  const BlogModel = mongoose.model('Blog', blogSchema);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})