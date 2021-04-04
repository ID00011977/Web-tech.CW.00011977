const express = require('express')
const app = express()

const fs = require('fs')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

//local host:8000
app.get('/', (req, res) => {
    res.render('home')
})

app.post('/create', (req, res) => {
    const title = req.body.title
    const description = req.body.description

    if (title.trim() === '' && description.trim() === '') {
        res.render('create', { error: true })
    } else {
        fs.readFile('./data/works.json', (err, data) => {
            if (err) throw err

            const works = JSON.parse(data)

            works.push({
                id: id(),
                title: title,
                description: description,
            })
            fs.writeFile('./data/works.json', JSON.stringify(works), err => {
                if (err) throw err
                res.render('create', { success: true })
            })
        })
    }

   
})

app.use(express.static('images'))

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

 function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }


