const {Router} = require('express')
const Todo = require('../models/Todo')
const router = Router()

//GET
router.get('/', async (req, res) =>{
    const todos = await Todo.find({}).lean()

    res.render('index', {
        title: 'Todos list',
        isIndex: true,
        todos
    })
})

router.get('/create', (req,res) =>{
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

router.get('/client', (req,res) =>{
    res.render('client', {
        title: 'Client todo',
        isClient: true
    })
})
//POST
router.post('/create', async (req, res) =>{
    const todo =new Todo({
        title:req.body.title
    })
    await todo.save()
    res.redirect('/')
})

router.post('/complete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)  
    todo.completed = !!req.body.completed
    await todo.save()
  
    res.redirect('/')
  })

module.exports = router
