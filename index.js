const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const {v4} = require('uuid')


const PORT = process.env.PORT || 3000


const app = express()

let CONTACTS = [
    {id: v4(), name: 'Daniyar', value: '+7-921-100-20-30', marked: false}
  ]  

app.use(express.json())

// GET
app.get('/api/contacts', (req, res) => {
  setTimeout(() => {
    res.status(200).json(CONTACTS)
  }, 1000)
})

// POST
app.post('/api/contacts', (req, res) => {
  const contact = {...req.body, id: v4(), marked: false}
  CONTACTS.push(contact)
  res.status(201).json(contact)
})

// DELETE
app.delete('/api/contacts/:id', (req, res) => {
  CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
  res.status(200).json({message: 'Контакт был удален'})
})

// PUT
app.put('/api/contacts/:id', (req, res) => {
  const idx = CONTACTS.findIndex(c => c.id === req.params.id)
  CONTACTS[idx] = req.body
  res.json(CONTACTS[idx])
})


app.use(express.static(path.resolve(__dirname, 'views')))

// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'views//layouts', 'main.hbs'))
//   })  

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))



app.use(todoRoutes)

async function start(){
    try {
        await mongoose.connect(
            'mongodb+srv://Daniyar:d112233@cluster0.c7v7f.mongodb.net/todos',{
                useNewUrlParser: true,         
                useUnifiedTopology: false
                
                }, err => {
                    if(err) throw err;
                    console.log('Connected to MongoDB!!!')
                    }
        )
    app.listen(PORT, ()=>{
    console.log('Server has been started...') 
    })
    } catch (e) {
        console.log(e)
    }
}
start()




