const Member = require('../models/Member')
const { age, date } = require("../../lib/utils")

module.exports = {
  index(req, res){
    Member.all(function(members){
      return res.render("members/index", { members })
    })
  },
  create(req, res){

    Member.instructorsSelectOption(function(options) {
      return res.render('members/create', { instructorOptions: options })
    })
  },
  post(req, res){
    const keys = Object.keys(req.body)
    for( key of keys) {
      //req.body.avatar_url == ""
      if (req.body[key] == ""){
        return res.send("Please, fill all filds")
      }
    }
    Member.create(req.body, function(member){
      return res.redirect(`/members/${member.id}`)
    })
  },
  show(req, res){
    Member.find(req.params.id, function(member){
      if(!Member) return res.send("Member not found!")
      member.birth = date(member.birth).birthDay
      
      return res.render("members/show", { member })
    })
  },
  edit(req, res){
    Member.find(req.params.id, function(member){
      if(!Member) return res.send("Member not found!")
      member.birth = date(member.birth).iso
     
      Member.instructorsSelectOption(function(options) {
        return res.render('members/edit', {member, instructorOptions: options })
      })
    })
  },
  put(req, res){
    const keys = Object.keys(req.body)
    for( key of keys) {
      //req.body.avatar_url == ""
      if (req.body[key] == ""){
        return res.send("Please, fill all filds")
      }
    }
    Member.update(req.body, function(){
      return res.redirect(`/members/${ req.body.id }`)
    })
  },
  delete(req, res){
    Member.delete(req.body.id, function(){
      return res.redirect(`/members`)
    })
  },
}

