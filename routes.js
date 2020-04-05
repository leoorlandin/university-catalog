const express = require('express')
const routes = express.Router()
// const teachers = require('./teachers')


routes.get('/', function(req, res){
  return res.redirect("/teachers")
})

routes.get('/teachers', function(req, res){
  return res.render("teachers/index")
})

routes.get('/teachers/create', function(req, res){
  return res.render("teachers/create")
})

routes.post('/teachers', function(req, res){
  
  if(req.body.name != ""){
    return res.send(req.body.name)
  }


})

routes.get('/members', function(req, res){
  return res.send("members")
})


module.exports = routes