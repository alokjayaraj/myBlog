

const USER = require('../models/usersModel').users
const mongoose = require('mongoose')


const getUserData = (userID) =>{
    return  USER.find({_id:userID}, {password:0})
}
   
module.exports = getUserData