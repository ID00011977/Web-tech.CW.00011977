const express = require('express')
const app = express()

const fs = require('fs')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static('images'))

//local host:8000
app.get('/', (req, res) => {
    res.render('home')
})

app.get('/create', (req, res) => {

    res.render('create')
})

app.post('/create', (req, res) => {

    // readinng the 
    const title = req.body.title
    const description = req.body.description
    const name = req.body.name

    if (title.trim() === '' && description.trim() === '' && name.trim() === '') {
        res.render('create', { error: true })
    } else {
        fs.readFile('./data/posts.json', (err, data) => {
            if (err) throw err

            const posts = JSON.parse(data)

            posts.push({
                id: id(),
                title: title,
                description: description,
                name: name
                                
            })
            fs.writeFile('./data/posts.json', JSON.stringify(posts), err => {
                if (err) throw err
                res.render('create', { success: true })
            })      
        })
    }  
})

app.get('/posts', (req, res) => {
    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err
        else {
            const posts = JSON.parse(data)

            res.render('posts', { posts: posts })
        }
        
    })
})


app.get('/posts/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/posts.json', (err, data) => {
        if (err) throw err
       
        const posts = JSON.parse(data)

        const post = posts.filter(post => post.id == id)[0]

        res.render('detail', { post: post })
    })
})

// delete controller 

app.get('/:id/delete', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/posts.json', (err, data) => {
        if(err) throw err 

        const posts = JSON.parse(data)

        const filteredPosts = posts.filter(post => post.id != id)

        fs.writeFile('./data/posts.json', JSON.stringify(filteredPosts), (err) => {
            if (err) throw err

            res.render('posts', { posts: filteredPosts, delete: true})
        })
    })
})



app.listen(8000, err => {
    if(err) console.log(err)

    console.log('Server is running on port 8000...')
})

 function id () {
    return '_' + Math.random().toString(36).substr(2, 9);
  }


