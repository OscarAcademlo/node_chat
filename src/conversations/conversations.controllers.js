//? Dependencies Controllers table conversations
const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Users = require('../models/users.models') 
const { hashPassword } = require('../utils/crypto')

const getAllConversationsMe = async() => {
    const data = await Conversations.findAll({
         where: {
            user_id
        }, 
        attributes: {
            exclude: ['userId','createdAt', 'updatedAt']
         },
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })
    return data
}


const createConversations = async (data) => {
    const newConversations = await Conversations.create({
        id: uuid.v4(),
        title: data.title,
        imageUrl: data.imageUrl,
        userId: data.userId //Viene del token
    })
    return newConversations
}

const getConversationsById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id,
        },
        include: [
            {
                model: Users,
                as: 'user',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]    
    })
    return data
}




const updateConversation = async (id, data) => {
    const result = await Conversations.update(data, {
        where: {
            id
        }
    })
    return result
}

const deleteConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id
        }
    })
    return data
}


//? Un servidor contiene la API
//? Otro servidor contiene la base de datos
//? SELECT * FROM users where email ='leo@gmail.com' en data esta toda la info
//? Por eso se maneja asyncrona, hay que esperar la respuesta o retorno de la BD
// const getUserByEmail = async (email) => {
//     const data = await Users.findOne({
//         where : {
//             email:email,
//             status:'active'
//         }
//     })
//     return data
// }


module.exports = {
    //3.A
    getAllConversationsMe,
    createConversations,
    //3.B
    getConversationsById,
    updateConversation,
    deleteConversation
}