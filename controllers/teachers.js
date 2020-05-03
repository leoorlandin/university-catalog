const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../util')

//INDEX
exports.index = function (req, res) {



  return res.render("teachers/index", { teachers: data.teachers })


}



//SHOW
exports.show = function (req, res) {

  const { id } = req.params

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id
  })

  if (!foundTeacher) return res.send('Teacher not found!')


  const teacher = {
    ...foundTeacher,
    birth: age(foundTeacher.birth),
    areas: foundTeacher.areas.split(","),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.created_at)
  }


  return res.render('teachers/show', { teacher })
}

//CREATE
exports.create = function (req, res) {
  return res.render("teachers/create")
}

//POST
exports.post = function (req, res) {

  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('Por favor, preencha todos os campos!')
    }
  }


  birth = Date.parse(req.body.birth)
  const created_at = Date.now()

  let id = 1
  const lastTeacher = data.teachers[data.teachers.length - 1]

  if (lastTeacher) {
    id = lastTeacher.id + 1
  }

  data.teachers.push({
    id,
    ...req.body,
    birth,
    created_at
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error")

    return res.redirect("/teachers")
  })

  // return res.send(req.body)

}

//EDIT
exports.edit = function (req, res) {

  const { id } = req.params

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id
  })

  if (!foundTeacher) return res.send("Teacher not found!")

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso,
  }

  return res.render("teachers/edit", { teacher })

}

//PUT
exports.put = function (req, res) {
  const { id } = req.body
  let index = 0

  const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
    if (id == teacher.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundTeacher) return res.send('Teacher not found')

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.teachers[index] = teacher

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write error')
  })

  return res.redirect(`/teachers/${id}`)

}

//DELETE
exports.delete = function (req, res) {
  const { id } = req.body

  const filteredTeachers = data.teachers.filter(function (teacher) {
    return teacher.id != id
  })

  data.teachers = filteredTeachers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send('Write file error')
  })

  return res.redirect("/teachers")
}
