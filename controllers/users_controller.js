
const mongoose = require("mongoose");
const User = require('../models/user');


getAllUser = (req, res, next) => {
  User.find({}).then((users)=>{
    res.send(users);
  })
}

getUserById = (req, res, next) =>{
  let userId = req.params.id
  userId = mongoose.Types.ObjectId(userId);
  User.findById(userId).then((user)=>{
    if(user === null){
      res.send({
        message:"No user is present with this ID"
      });
    }
    res.send(user);
  }).catch(next)
}

createUser = (req, res, next) => {
  const userProps = req.body;
  User.findOne({name:req.body.name}).count().then((count)=>{
    if(count >0){
      res.send({
        message: 'This user is already present.'
      })
    }
    else{
      User.create(userProps)
        .then((user) => {
          res.send({
            message: 'An user created sucessfully.',
            data: user
          })
        })
        .catch(next)
    }

  }).catch(next)

}

editUser = (req, res, next) => {
  const userProps = req.body;
  const userId = req.params.id;
  User.findByIdAndUpdate({
      _id: userId
    }, userProps)
    .then(() => User.findById({
      _id: userId
    }))
    .then((user) => {
      res.send({
        message: 'An user updated sucessfully.',
        data: user
      })
    }).catch(next)

}

deleteUser = (req, res, next) => {
  const userId = req.params.id;
  User.findByIdAndRemove({
      _id: userId
    })
    .then((user) => {
      if (user === null) {
        res.send({
          message: 'This user is not present in the database.'
        })
      } else {
        res.send({
          message: 'An user deleted sucessfully.',
          data: user
        })

      }
    }).catch(next)

}

module.exports = {
  getAllUser,
  getUserById,
  createUser,
  editUser,
  deleteUser
}
