import express from 'express'
import { request } from 'express'


const categories = ['Food', 'Work', 'Coding', 'Other']

const entries= [
    { category : 'Food', content: 'Hello'},
    { category : 'Coding', content: 'Express is cool!'},
    { category : 'Work', content: 'Another day at office'},
]
const app = express()
const port = 4001

app.use(express.json())

app.get('/', (request, response) => response.send({info : 'Journal API'}))

app.get('/categories', (req,res) => res.send(categories))

app.get('/entries', (req,res) => res.send(entries))

app.get('/entries/:id', (req,res) => {
    const entry = entries[req.params.id]
    if (entry){
        res.send(entry)
    }else{
        res.status(404).send({error: 'Entry not found!'})
    }
})

app.post('/entries', (req,res) => {
  
    // res.send(req.body)
    // 1. Create a new entry object with values passed in form the request
    const {category, content} = req.body
    const newEntry = { category, content}
    
    // 2. push the new entry to the entries array
    entries.push(newEntry)
    // 3. send the new entry with 201 status
    res.status(201).send(newEntry)

})

app.listen(port, () => console.log(`App running at http://localhost: ${port}/`))