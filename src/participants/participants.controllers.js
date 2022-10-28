const Participants = require('../models/participants.models')
const uuid = require('uuid')
const Users = require('../models/users.models')

const getPartByConversationId = async(conversationId) => {
    const data = await Participants.findAll({
        where: {
            conversationId
        }
    })
    return data
}

const createPartConversation = async (data) => {
const response = await Participants.create({
        id: uuid.v4(),
        userId:data.userId, // se obtiene del body
        conversationId: data.conversationId // se obtiene del parametro
    })
    return response
}

const getPartConversationByPart = async(conversationId,id) => {
    const data = await Participants.findOne({
        where: {
            id,
            conversationId
        }
    })
    return data
}

const deletePartConversationByPart = async(conversationId,id) => {
    const data = await Participants.destroy({
        where: {
            id,
            conversationId
        }
    })
    return data
}
module.exports = {
    getPartByConversationId,
    createPartConversation,
    getPartConversationByPart,
    deletePartConversationByPart
}
