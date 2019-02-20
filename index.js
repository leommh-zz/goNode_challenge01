const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

// lib de templates front
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extend: false }))
app.set('view engine', 'njk')

const checkMiddleware = (req, res, next) => {
  const idade = Number(req.query.idade)
  return idade && idade > 0 ? next() : res.redirect('/')
}

app.post('/check', (req, res) => {
  const idade = Number(req.body.age)
  const page = idade < 18 ? '/minor' : '/major'
  return res.redirect(`${page}?idade=${idade}`)
})

app.get('/', (req, res) => {
  return res.render('home')
})

app.get('/major', checkMiddleware, (req, res) => {
  const idade = Number(req.query.idade)
  return res.render('major', { idade })
})

app.get('/minor', checkMiddleware, (req, res) => {
  const idade = Number(req.query.idade)
  return res.render('minor', { idade })
})

app.listen(3000)
