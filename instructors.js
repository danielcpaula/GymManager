const fs = require('fs')
const data = require("./data.json")
//Create
exports.post = function(req, res){
  const keys = Object.keys(req.body)

  for( key of keys) {
    //req.body.avatar_url == ""
    if (req.body[key] == ""){
      return res.send("Please, fill all filds")
    }
  }

  //[]
  data.instructors.push(req.body) //[{...}]

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return res.send("write file error")

    return res.redirect("/instructors")
  })
  //return res.send(req.body)
}



//update


//delete