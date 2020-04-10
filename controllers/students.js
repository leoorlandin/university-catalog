const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../util')

//INDEX
exports.index = function (req, res) {
  

  return res.render("students/index", { students: data.students })


}

//CREATE
exports.create = function (req, res) {
  return res.render("students/create")
}

//POST
exports.post = function (req, res) {

  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('Por favor, preencha todos os campos!')
    }
  }

  let { avatar_url, name, birth, formation, lecture, areas } = req.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.students.length + 1)

  data.students.push({
    id,
    avatar_url,
    name,
    birth,
    formation,
    lecture,
    areas,
    created_at
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error")

    return res.redirect("/students")
  })

  // return res.send(req.body)

}

//SHOW
exports.show = function (req, res) {

  const { id } = req.params

  const foundstudent = data.students.find(function (student) {
    return student.id == id
  })

  if (!foundstudent) return res.send('student not found!')


  const student = {
    ...foundstudent,
    birth: age(foundstudent.birth),
    areas: foundstudent.areas.split(","),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundstudent.created_at)
  }


  return res.render('students/show', { student })
}

//EDIT
exports.edit = function (req, res) {

  const { id } = req.params

  const foundstudent = data.students.find(function (student) {
    return student.id == id
  })

  if (!foundstudent) return res.send("student not found!")

  const student = {
    ...foundstudent,
    birth: date(foundstudent.birth),
  }

  return res.render("students/edit", { student })

}

//PUT
exports.put = function (req, res) {
  const { id } = req.body
  let index = 0

  const foundstudent = data.students.find(function (student, foundIndex) {
    if (id == student.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundstudent) return res.send('student not found')

  const student = {
    ...foundstudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.students[index] = student

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write error')
  })

  return res.redirect(`/students/${id}`)

}

//DELETE
exports.delete = function (req, res) {
  const { id } = req.body

  const filteredstudents = data.students.filter(function (student) {
    return student.id != id
  })

  data.students = filteredstudents

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error')
  })

  return res.redirect("/students")
}
