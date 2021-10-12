const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const initialUsers = require('../mockData/users')


const usersInDb = async() => {
    const response =  await User.find({})
    return response.map(user=>user.toJSON())
}

const inserMany = async()=> {
    for(let user of initialUsers){
        userObj = {...user}
        userObj.password = await bcrypt.hash(user.password, 10)
        const newUser = new User(userObj)
        await newUser.save()
    }
return
}

const getRandomUser = async () => {
    const users = await User.find({})
    const allUser = users.map(user=>user.toJSON())
    console.log(allUser)
    return allUser[Math.floor(Math.random() * allUser.length)]
}
const getRandomUserId = async () => {
    const users = await User.find({})
    const allUser = users.map(user=>user.toJSON())
    console.log(allUser)
    return allUser[Math.floor(Math.random() * allUser.length)].id
}



module.exports = {
    usersInDb,
    inserMany,
    getRandomUser,
    getRandomUserId,
}