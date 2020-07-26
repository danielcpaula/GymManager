const fs = require('fs')
const data = require("./data.json")
const { age } = require("./utils")

//show
exports.show = function(req, res) {
  //req.query.id
  //req.body
  //req.params.id = /:id
  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return id == instructor.id
  })

  if (!foundInstructor) return res.send("Instructor no found")

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    gender: "",
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at)
  }
  //return res.send(foundInstructor)
  return res.render("instructors/show", { instructor })
}

//Edit
exports.edit = function(req, res) {
  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor){
    return id == instructor.id
  })

  if (!foundInstructor) return res.send("Instructor no found")
  return res.render('instructors/edit', {instructor: foundInstructor})
}
//Create
exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for( key of keys) {
    //req.body.avatar_url == ""
    if (req.body[key] == ""){
      return res.send("Please, fill all filds")
    }
  }

  let {avatar_url, birth, name, services, gender} = req.body
  
  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)


  //[]
  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write file error")

    return res.redirect("/instructors")
  })
  //return res.send(req.body)
}