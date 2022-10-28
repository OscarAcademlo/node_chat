const uuid = require('uuid')

const Messages = require('../models/messages.models')
const Conversations = require('../models/conversations.models')
const Users = require('../models/users.models')

const getAllMessages = async () => {
    const data = await Messages.findAll()
    return data
}

const getMsgByConversationId = async (conversationId) => {
    const data = await Messages.findAll({
        where: {
            conversationId
        },
        order:[['userId', 'ASC'],['createAt', 'DESC']],
        attributes: {
            exclude: ['createdAt', 'updatedAt']
         },
        include: [
            {
                model: Conversations,
                attributes: ['title']
            }
        ]
    })
    return data   
}


const createMessage = async (data) => {
    const newMessage = await Messages.create({
        id: uuid.v4(),
        userId: data.userId,
        conversationId: data.conversationId,
        message: data.message
    })
    return newMessage
}

const getMsgByMessageId = async(id,conversationId) => {
    const data = await Messages.findOne({
        where: {
            id,
            conversationId
        },
        include: [
            {
                model: Conversations,
                attributes: ['title']
            }
        ]        
        
    })
    return data
}

const deleteMsgByMessageId = async (id,conversationId) => {
    const data = await Messages.destroy({
        where: {
            id,
            conversationId
        }
    })
    return data
}



module.exports = {
    // 3.C
    getAllMessages,
    getMsgByConversationId,
    createMessage,
    // 3.D
    getMsgByMessageId,
    deleteMsgByMessageId
}