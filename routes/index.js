const express = require('express')
const router = express.Router()
const Book = require('../models/book')

router.get('/:id/edit', async (req, res) => {
    try {
      const author = await Author.findById(req.params.id)
      res.render('authors/edit', { author: author })
    } catch {
      res.redirect('/authors')
    }
  })
  
  router.put('/:id', async (req, res) => {
    let author
    try {
      author = await Author.findById(req.params.id)
      author.name = req.body.name
      await author.save()
      res.redirect(`/authors/${author.id}`)
    } catch {
      if (author == null) {
        res.redirect('/')
      } else {
        res.render('authors/edit', {
          author: author,
          errorMessage: 'Error updating Author'
        })
      }
    }
  })