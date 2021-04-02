const express = require('express')
const app = express()



app.set('view engine', 'pug')

app.use('/static', express.static('public'))

//local host:8000
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {
    res.render('create')
})


const works =  ['Some works to do', 'Some works to do 2']

app.get('/works', (req, res) => {
    res.render('works', { works: works })
})

app.get('/works/detail', (req, res) => {
    res.render('detail')
})

app.listen(8000, err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
})