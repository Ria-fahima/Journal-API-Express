import express from 'express'
import { CategoryModel, EntryModel } from '../db.js'

const router = express.Router()

router.get('/', async (req,res) => res.send(await EntryModel.find().populate({ path :'category' , select : 'name'})))

router.get('/:id', async(req,res) => {
    try{
    const entry = await (await EntryModel.findById(req.params.id)).populate({ path: 'category', select : 'name'})
    if (entry){
        res.send(entry)
    }else{
        res.status(404).send({error: 'Entry not found!'})
    }
}catch (err) {
    res.status(500).send({error: err.message})
}
})

//Update
router.put('/:id', async(req,res) => {
    const {category, content} = req.body
    const newEntry = { category, content}

    try{
    const entry = await EntryModel.findByIdAndUpdate(req.params.id, newEntry, {returnDocument : 'after'})
    if (entry){
        res.send(entry)
    }else{
        res.status(404).send({error: 'Entry not found!'})
    }
}catch (err) {
    res.status(500).send({error: err.message})
}
})

//Delete
router.delete('/:id', async(req,res) => {
    try{
    const entry = await EntryModel.findByIdAndDelete(req.params.id)
    if (entry){
        res.sendStatus(204)
    }else{
        res.status(404).send({error: 'Entry not found!'})
    }
}catch (err) {
    res.status(500).send({error: err.message})
}
})



router.post('/', async (req,res) => {
  try{
    // res.send(req.body)
    // 1. Create a new entry object with values passed in form the request
    const {category, content} = req.body
    const categoryObject = await CategoryModel.findOne({ name: category})
    const newEntry = { category : categoryObject._id , content : content}
    
    // 2. push the new entry to the entries array
    // entries.push(newEntry)
    const insertedEntry = await EntryModel.create(newEntry)
    // 3. send the new entry with 201 status
    
    res.status(201).send(await insertedEntry.populate({ path: 'category', select : 'name'}))
  }
  catch (err) {
      res.status(500).send({error: err.message})
  }

})

export default router